const mongoose = require('mongoose');

const connectURL = 
    //proccess.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/plushinetdb";

mongoose.connect(connectURL);

// const connectDB = async () => {
//     try{
//         console.log(connectURL);
//         const mongooseConnection = await mongoose.connect(connectURL);
//         console.log(`Sucessfully connected to DB at ${mongooseConnection.connection.host}`)
//     }catch(err){
//         console.log(`Error connecting to DB ${err}`);
//     }
// };

module.exports = mongoose.connection;