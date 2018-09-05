const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res) {
    let artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error en la petición'
                });
        }

        if (!artist) {
            return res.status(400)
                .json({
                    message: 'Artista no existe'
                });
        }

        res.json({
            artist
        });
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

function getArtists(req, res) {

    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    let itemsPerPage = 3;

    Artist.find()
        .sort('name')
        .paginate(page, itemsPerPage, (err, artists, total) => {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error en la petición'
                    });
            }

            if (!artists) {
                return res.json({
                    message: 'No se encontraron artistas'
                })
            }

            res.json({
                total,
                artists
            });
        });

}

module.exports = {
    getArtist,
    saveArtist,
    getArtists
}