const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SongSchema = Schema({
    number: Number,
    name: String,
    duration: String,
    file: Number,
    album: {
        type: Schema.ObjectId,
        ref: 'Album'
    }
});

module.exports = mongoose.model('Song', SongSchema);