const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URI);
        const mongooseConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Sucessfully connected to DB at ${mongooseConnection.connection.host}`)
    }catch(err){
        console.log(`Error connecting to DB ${err}`);
    }
};

module.exports = connectDB;