const mongoose = require('mongoose');

//define candidate schema
const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    party:{
        type: String,
        required: true
    },
    age:{
        required: true,
        type: Number,
        min: 18,  // Assuming 18 is the minimum age for a candidate
        max: 100  // Assuming 100 is the maximum age for a candidate
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt:{
                type:Date,
                default: Date.now
            }
        }
    ],
    voteCount:{
        type: Number,
        default: 0
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate;