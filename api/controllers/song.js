const fs = require('fs');
const path = require('path');
const mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getSong(req, res) {
    let songId = req.params.id;

    Song.findById(songId)
        .populate({ path: 'album' })
        .exec((err, song) => {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error en la petición'
                    });
            }
            if (!song) {
                return res.status(400)
                    .json({
                        message: 'Canción no existe'
                    });
            }

            res.json({
                song
            });
        });
}

function saveSong(req, res) {
    var params = req.body;
    var song = new Song();
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = '';
    song.album = params.album;

    song.save((err, songSaved) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al guardar la canción'
                });
        }

        if (!songSaved) {
            return res.status(400)
                .json({
                    message: 'La canción no ha sido guardada'
                });
        }

        res.json({
            song: songSaved
        });
    });

}

function getSongs(req, res) {

    let albumId = req.params.album;

    let finded = [];
    if (!albumId) {
        finded = Song.find({}).sort('number');
    } else {
        finded = Song.find({ album: albumId }).sort('number');
    }

    finded.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error en la petición'
                });
        }
        if (!songs) {
            return res.json({
                message: 'No se encontraron canciones'
            })
        }

        res.json({
            songs
        });
    });
}

function updateSong(req, res) {

    let songId = req.params.id;
    let update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al guardar la canción'
                });
        }
        if (!songUpdated) {
            return res.status(400)
                .json({
                    message: 'La canción no existe'
                });
        }

        res.json({
            song: songUpdated
        });
    });
}

function deleteSong(req, res) {
    let songId = req.params.id;

    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al eliminar el album'
                });
        }
        if (!songRemoved) {
            return res.status(400)
                .json({
                    message: 'La canción no existe'
                });
        }

        res.json({
            song: songRemoved
        });
    });
}

function uploadFile(req, res) {
    let songId = req.params.id;
    let fileName = 'No subido...';

    if (!req.files) {
        return res.status(400)
            .json({
                message: 'No se ha subido ningun archivo'
            });
    }

    let filePath = req.files.file.path;
    let fileSplit = filePath.split('/');
    fileName = fileSplit[2];
    let extSplit = fileName.split('.');
    let ext = extSplit[extSplit.length - 1];

    let extensionesValidas = ['mp3', 'ogg'];
    if (extensionesValidas.indexOf(ext) < 0) {
        return res.status(400)
            .json({
                message: 'El archivo no tiene una extension permitida'
            });
    }

    Song.findByIdAndUpdate(songId, { file: fileName }, (err, songUpdated) => {
        if (err) {
            console.log(err.message);
            return res.status(500)
                .json({
                    message: 'Error al actualizar la canción del album'
                });
        }

        res.json({
            album: songUpdated
        });
    });
}

function getSongFile(req, res) {
    var songFile = req.params.songFile;
    var path_file = './uploads/songs/' + songFile;
    fs.exists(path_file, (exists) => {
        if (!exists) {
            return res.status(400)
                .json({
                    message: 'No existe el archivo'
                });
        }
        res.sendFile(path.resolve(path_file));
    });
}


module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}