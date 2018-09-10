const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    desc: String,
    img: String
});

module.exports = mongoose.model('Artist', ArtistSchema);