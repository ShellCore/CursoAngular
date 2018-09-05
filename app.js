const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de cabeceras HTTP

// Rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);

module.exports = app;