const fs = require('fs');
const path = require('path');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res) {
    res.json({
        message: 'Método getArtist del controlador artist.js'
    });
}

function saveArtist(req, res) {
    var params = req.body;
    var artist = new Artist();
    artist.name = params.name;
    artist.desc = params.desc;
    artist.img = '';

    artist.save((err, artistSaved) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al guardar el artista'
                });
        }

        if (!artistSaved) {
            return res.status(400)
                .json({
                    message: 'El artista no ha sido guardado'
                });
        }

        res.json({
            artist: artistSaved
        });
    });

}

module.exports = {
    getArtist,
    saveArtist
}