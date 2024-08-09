const mongoose = require('mongoose');

//define candidate schema
const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    Party:{
        type: String,
        required: true
    },
    age:{
        required: true,
        type: Number
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate;