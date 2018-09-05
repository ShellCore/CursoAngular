const express = require('express');
const api = express.Router();
const UserController = require('../controllers/user');
const md_auth = require('../middleware/authenticated');

api.get('/probandoControlador', md_auth.ensureAuth, UserController.pruebas);

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

module.exports = api;