const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const path = require('path');

const User = require('../models/user');
const jwt = require('../services/jwt');

function pruebas(req, res) {
    res.json({
        message: 'Probando una acción del controlador de usuarios del API Rest con NodeJD y MongoDB'
    });
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER'; // ROLE_ADMIN
    user.img = '';

    if (!params.password) {
        return res.status(500)
            .json({
                message: 'Introduce la contraseña'
            });
    }

    // Encriptar contraseña y guardar dato
    bcrypt.hash(params.password, null, null, (err, hash) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error en la encriptación de la contraseña'
                });
        }

        user.password = hash;

        if (user.name === null ||
            user.surname === null ||
            user.email === null) {
            return res.json({
                message: 'Datos incompletos'
            });
        }

        // Almacenamiento de usuario
        user.save((err, userStored) => {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error en el almacenamiento del usuario'
                    });
            }
            if (!userStored) {
                return res.status(400).json({
                    message: 'No se ha almacenado el usuario'
                });
            }

            res.json({
                user: userStored
            });
        });
    });
}

function loginUser(req, res) {
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error en la petición'
                });
        }

        if (!user) {
            return res.status(400)
                .json({
                    message: 'El usuario no existe'
                });
        }

        bcrypt.compare(password, user.password, (err, check) => {
            if (err) {
                return res.status(500)
                    .json({
                        message: 'Error en la comparación de contraseñas'
                    });
            }
            if (!check) {
                return res.status(400)
                    .json({
                        message: 'La contraseña es incorrecta'
                    })
            }

            if (params.gethash) {
                return res.json({
                    token: jwt.createToken(user)
                });
            }

            res.json({ user });
        });
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al actualizar el usuario'
                });
        }

        if (!userUpdated) {
            return res.status(404)
                .json({
                    message: 'No se ha podido actualizar al usuario'
                });
        }

        res.json({
            user: userUpdated
        })
    });
}

function uploadImg(req, res) {
    let userId = req.params.id;
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

    User.findByIdAndUpdate(userId, { img: fileName }, (err, userUpdated) => {
        if (err) {
            return res.status(500)
                .json({
                    message: 'Error al actualizar la imagen del usuario'
                });
        }

        res.json({
            user: userUpdated
        });
    });
}

function getImageFile(req, res) {
    let imageFile = req.params.imageFile;

    let imagePath = `./uploads/users/${imageFile}`;

    fs.exists(imagePath, (exists) => {
        if (!exists) {
            return res.status(400)
                .json({
                    message: 'El archivo no existe'
                });
        }

        res.sendFile(path.resolve(imagePath));
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImg,
    getImageFile
};