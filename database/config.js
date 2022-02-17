const mongoose = require('mongoose')


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_CONN);
        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect with the database');
    }
}

module.exports = {
    dbConnection
}