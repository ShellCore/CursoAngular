'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/musifydb', (err) => {
    if (err) {
        throw err;
    }
    console.log('Database connected!');
});