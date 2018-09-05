const express = require('express');

const api = express.Router();
const ArtistController = require('../controllers/artist');

const md_auth = require('../middleware/authenticated');

api.get('/artist', md_auth.ensureAuth, ArtistController.getArtist);

module.exports = api;