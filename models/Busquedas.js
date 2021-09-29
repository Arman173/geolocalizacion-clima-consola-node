const fs = require('fs');

const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        // TODO: leer DB si existe
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": 5,
            "language": 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            "appid": process.env.OPENWEATHER_KEY,
            "units": 'metric',
            "lang": 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map( lugar => {
            // forma corta de capitalizar el nombre del lugar
            //return lugar.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ');
        });
    }

    async ciudad( lugar ) {

        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })); // retornar los lugares

        } catch ( err ) {
            return []; // retornamos un arreglo vacio
        }

    }

    async climaLugar( lat, lon ) {
        try {

            // instance axios.create()
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            // resp.data
            const resp = await instance.get();
            
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max
            }

        } catch ( err ) {
            console.log('');
        }
    }

    agregarHistorial( lugar = '' ) {

        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }
        // solo mantenemos 5  elementos en el historial
        this.historial = this.historial.splice(0, 4);

        // TODO: prevenir duplicados
        this.historial.unshift( lugar.toLocaleLowerCase() );

        // grabar DB
        this.guargarDB();
    }

    guargarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync( this.dbPath, JSON.stringify(payload) )
    }

    leerDB() {

        // Debe de existir...
        if( !fs.existsSync(this.dbPath) ){
            return;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.historial = data.historial;

    }

}



module.exports = Busquedas;