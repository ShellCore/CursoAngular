const express = require('express');
const api = express.Router();
const UserController = require('../controllers/user');

api.get('/probandoControlador', UserController.pruebas);

api.post('/register', UserController.saveUser);

module.exports = api;