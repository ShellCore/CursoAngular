const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');

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

module.exports = {
    pruebas,
    saveUser
};