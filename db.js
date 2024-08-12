const mongoose = require('mongoose');
require('dotenv').config();

console.log('Attempting to connect to MongoDB...');

const mongoURL = 'mongodb://localhost:27017/voting';

mongoose.connect(mongoURL)
    .then(() => {
        console.log('Connected to MongoDB server');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

module.exports = mongoose.connect;
