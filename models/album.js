const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    desc: String,
    year: Number,
    img: String,
    artist: {
        type: Schema.ObjectId,
        ref: 'Artist'
    }
});

module.exports = mongoose.model('Album', AlbumSchema);