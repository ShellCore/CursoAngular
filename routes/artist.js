const express = require('express');
const multipart = require('connect-multiparty');

const api = express.Router();
const ArtistController = require('../controllers/artist');

const md_auth = require('../middleware/authenticated');
const md_upload = multipart({ uploadDir: './uploads/artists' });

api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImg);

module.exports = api;