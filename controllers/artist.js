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

function updateArtist(req, res) {

    let artistId = req.params.id;
    let update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al guardar el artista'
                });
        }
        if (!artistUpdated) {
            return res.status(400)
                .json({
                    message: 'El artista no existe'
                });
        }

        res.json({
            artist: artistUpdated
        });
    });
}

function deleteArtist(req, res) {
    let artistId = req.params.id;

    Artist.findOneAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al eliminar el artista'
                });
        }
        if (!artistRemoved) {
            return res.status(400)
                .json({
                    message: 'El artista no existe'
                });
        }

        Album.find({ artist: artistRemoved._id }).remove((err, albumRemoved) => {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error al eliminar el album del artista'
                    });
            }
            if (!albumRemoved) {
                return res.status(400)
                    .json({
                        message: 'El album no existe'
                    });
            }

            Song.find({ album: albumRemoved._id }).remove((err, songRemoved) => {
                if (err) {
                    return res.status(500)
                        .json({
                            message: 'Error al eliminar la canción del album'
                        });
                }
                if (!songRemoved) {
                    return res.status(400)
                        .json({
                            message: 'La canción no existe'
                        });
                }
                res.json({
                    artist: artistRemoved
                });
            });
        });
    });
}

function uploadImg(req, res) {
    let artistId = req.params.id;
    let fileName = 'No subido...';

    if (!req.files) {
        return res.status(400)
            .json({
                message: 'No se ha subido ninguna imagen'
            });
    }

    let filePath = req.files.image.path;
    let fileSplit = filePath.split('/');
    fileName = fileSplit[2];
    let extSplit = fileName.split('.');
    let ext = extSplit[extSplit.length - 1];

    let extensionesValidas = ['jpg', 'gif', 'png', 'jpeg'];
    if (extensionesValidas.indexOf(ext) < 0) {
        return res.status(400)
            .json({
                message: 'El archivo no tiene una extension permitida'
            });
    }

    Artist.findByIdAndUpdate(artistId, { img: fileName }, (err, artistUpdated) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al actualizar la imagen del artista'
                });
        }

        res.json({
            artist: artistUpdated
        });
    });
}


module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImg
}