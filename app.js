const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Cargar rutas
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de cabeceras HTTP

// Rutas base
app.get('/prueba', (req, res) => {
    res.json({
        message: 'Bienvenido al curso de Angular'
    });
});

module.exports = app;