const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Cargar rutas
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de cabeceras HTTP

// Rutas base
app.use('/api', user_routes);

module.exports = app;