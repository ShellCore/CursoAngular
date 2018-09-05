const express = require('express');

const api = express.Router();
const ArtistController = require('../controllers/artist');

const md_auth = require('../middleware/authenticated');

api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);

module.exports = api;