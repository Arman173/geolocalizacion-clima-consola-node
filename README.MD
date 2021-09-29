# Para comenzar

Para para poder usar la aplicacion debes tener Node instalado.

Si ya tienes instalado Node, ya podras descargar el proyecto pero antes de
ejecutarlo tendras que usar el siguiente comando para instalar los paquetes 
de Node necesarios para que funcione la aplicacion
```
npm install
```

Para empezar la aplicacion use el comando `npm start` o `node app` en su terminal que este en el directorio
del proyecto

## Importante

- debes crear una cuenta de [mapbox](https://www.mapbox.com/) para poder crear tu api key de mapbox y asi consumir su api de geolocalización

- debes igual crear una cuenta de [Open Weather](https://openweathermap.org/), crear tu api key y asi poder consumir su api del clima mediente coordenadas

Una vez ya tengas tus api keys, solo tendras que ingresarlas en el fichero .env y poner tus claves. 
En el proyecto tienes un archivo [example.env](./example.env) el cual es un ejemplo de como debe quedar tus apis key en el archivo ya mencionado, solo renombralo a .env sin el 'example' e ingresas tus claves
```
MAPBOX_KEY= tu api key de mapbox
OPENWEATHER_KEY= tu api key de open weather
```