require('dotenv').config();
let mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }
    _connect() {
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('database connection successful');
        })
        .catch(err=>{
            console.error('database connection error');
        })
    }
}



module.exports = new Database();
