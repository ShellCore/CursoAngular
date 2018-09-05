'use strict'

var mongoose = require('mongoose');
var app = require('./app');
process.env.PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/musifydb', (err, res) => {
    if (err) throw err;

    console.log('Database connected!');

    app.listen(process.env.PORT, () => {
        console.log(`API REST Server listening at http://localhost:${process.env.PORT}/`);
    });
});