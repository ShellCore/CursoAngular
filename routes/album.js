const express = require('express');
const multipart = require('connect-multiparty');

const api = express.Router();
const AlbumController = require('../controllers/album');

const md_auth = require('../middleware/authenticated');
const md_upload = multipart({ uploadDir: './uploads/albums' });

api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/upload-image-Album/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImg);

module.exports = api;