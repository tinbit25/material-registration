const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydatabase', {
            
        });
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

module.exports = connectToDb;
