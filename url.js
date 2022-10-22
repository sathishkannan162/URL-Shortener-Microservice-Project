let mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');

const connection = mongoose.createConnection(process.env.MONGO_URI);
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

urlSchema.plugin( autoIncrement,{ model:'shorturl', field: 'short_url'});
module.exports = mongoose.model('shorturl',urlSchema);