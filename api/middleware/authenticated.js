const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_curso';

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403)
            .json({
                message: 'La petición no tiene la cabecera de autenticación'
            });
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401)
                .json({
                    message: 'Token ha expirado'
                });
        }

    } catch (err) {
        return res.status(404)
            .json({
                message: 'Token no válido'
            });
    }

    req.user = payload;
    next();
}