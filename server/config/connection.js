// const mongoose = require('mongoose');

// const connectURL = 
//     process.env.MONGO_URI ||
//     "mongodb://127.0.0.1:27017/plushinetdb";

// mongoose.connect(connectURL);



// module.exports = mongoose.connection;

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/plushinetdb');

module.exports = mongoose.connection;