const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res) {
    let albumId = req.params.id;

    Album.findById(albumId)
        .populate({ path: 'artist' })
        .exec((err, album) => {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error en la petición'
                    });
            }

            if (!album) {
                return res.status(400)
                    .json({
                        message: 'Album no existe'
                    });
            }

            res.json({
                album
            });
        });
}

function saveAlbum(req, res) {
    var params = req.body;
    var album = new Album();
    album.title = params.title;
    album.desc = params.desc;
    album.year = params.year;
    album.artist = params.artist
    album.img = '';

    album.save((err, albumSaved) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al guardar el album'
                });
        }

        if (!albumSaved) {
            return res.status(400)
                .json({
                    message: 'El album no ha sido guardado'
                });
        }

        res.json({
            album: albumSaved
        });
    });

}

function getAlbums(req, res) {

    let artistId = req.params.artist;

    let finded = [];
    if (!artistId) {
        finded = Album.find({}).sort('title');
    } else {
        finded = Album.find({ artist: artistId }).sort('year');
    }

    finded.populate({ path: 'artist' }).exec((err, albums) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error en la petición'
                });
        }
        if (!albums) {
            return res.json({
                message: 'No se encontraron albums'
            })
        }

        res.json({
            albums
        });
    });
}

function updateAlbum(req, res) {

    let albumId = req.params.id;
    let update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al guardar el album'
                });
        }
        if (!albumUpdated) {
            return res.status(400)
                .json({
                    message: 'El album no existe'
                });
        }

        res.json({
            album: albumUpdated
        });
    });
}

function deleteAlbum(req, res) {
    let albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al eliminar el album'
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
                album: albumRemoved
            });
        });
    });
}

function uploadImg(req, res) {
    let albumId = req.params.id;
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

    Album.findByIdAndUpdate(albumId, { img: fileName }, (err, albumUpdated) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al actualizar la imagen del album'
                });
        }

        res.json({
            album: albumUpdated
        });
    });
}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/' + imageFile;
    fs.exists(path_file, (exists) => {
        if (!exists) {
            return res.status(400)
                .json({
                    message: 'No existe la imagen'
                });
        }
        res.sendFile(path.resolve(path_file));
    });
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImg,
    getImageFile
}