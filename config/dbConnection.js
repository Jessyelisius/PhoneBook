
const mongoose = require('mongoose');

const connectionDB = async () => {
    try {
        const dbconn = await mongoose.connect(process.env.database_string);
        console.log('database connected successfully', dbconn.connection.host);
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectionDB;
