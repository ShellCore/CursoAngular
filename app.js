const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de cabeceras HTTP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite el acceso a todos los dominios
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Request-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
})

// Rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);

module.exports = app;