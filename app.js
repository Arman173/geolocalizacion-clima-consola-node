require('dotenv').config();
require('colors')
const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    const busquedas = new Busquedas();
    let opt; // variable donde se guardara la opcion del menu que el usuario selecciono

    do {
        opt = await inquirerMenu();

        switch( opt ) {
            case 1:
                // mostrar mensaje
                const busqueda = await leerInput('Ciudad:');

                // buscar los lugares
                const lugares = await busquedas.ciudad( busqueda );

                // seleccionar el lugar
                const id = await listarLugares( lugares );
                if( id === '0' ) continue;
                
                const lugarSel = lugares.find( lugar => lugar.id === id);

                // guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre )

                // clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                // mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n');
                console.log('Ciudad:', lugarSel.nombre.green );
                console.log('Lat:', lugarSel.lat );
                console.log('Lng:', lugarSel.lng );
                console.log('Clima descripción:', clima.desc.green );
                console.log('Temperatura:', clima.temp );
                console.log('Mínima:', clima.min );
                console.log('Máxima:', clima.max );

            break;
            case 2:
                console.log();
                busquedas.historialCapitalizado.forEach( (lugar , i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar }`);
                });
            break;
            case 0:
                console.log('salir');
            break;
        }

        await pausa();

    } while ( opt !== 0 );

}

main();