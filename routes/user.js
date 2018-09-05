const express = require('express');
const api = express.Router();
const UserController = require('../controllers/user');

api.get('/probandoControlador', UserController.pruebas);

module.exports = api;