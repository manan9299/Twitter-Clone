/**
 * @author Dharmang Solanki
 * 
 */
const mongoose = require("mongoose");
const config = require('config');
const db = config.get('mongoURI');
//const ObjectID = require('mongodb').ObjectID;
//const dbName = "grubhub";
//const dbPort = "27017";
//const url = "mongodb://localhost:"+dbPort;

// NOTE: poolSize is for connection pooling
const dbOptions = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    poolSize:50
};


/**
 * @description this async method will try to connect to the database and if it 
 * fails then it will throw the error message.
 * It is good practice to warp the the async-await inside the try-catch block
 * IN case of failure it will be exit with status 1
 */
const mongodbConnection = async () => {
    
    try{
        // mongoose.connect() returns a promise so we need to put the await keyword
        await mongoose.connect(db,dbOptions);
        console.log('Database Connected!')
        
    }catch(error){
        console.log('Database connection failed!');
        process.exit(1);
    }
}

module.exports = mongodbConnection;