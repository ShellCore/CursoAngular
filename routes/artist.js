const express = require('express');

const api = express.Router();
const ArtistController = require('../controllers/artist');

const md_auth = require('../middleware/authenticated');

api.post('/artist', md_auth.ensureAuth, ArtistController.saveArtist);
api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist);
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists);

module.exports = api;