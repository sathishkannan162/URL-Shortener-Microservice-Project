let mongoose = require('mongoose');

let urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    short_url: {
        type: Number,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('shorturl',urlSchema);