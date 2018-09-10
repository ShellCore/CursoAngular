const express = require('express');
const multipart = require('connect-multiparty');

const api = express.Router();
const UserController = require('../controllers/user');

const md_auth = require('../middleware/authenticated');
const md_upload = multipart({ uploadDir: './uploads/users' });

api.get('/probandoControlador', md_auth.ensureAuth, UserController.pruebas);

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImg);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api;