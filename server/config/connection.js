const mongoose = require('mongoose');

const connectURL = 
    //proccess.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/plushinetdb";

mongoose.connect(connectURL);

module.exports = mongoose.connection;