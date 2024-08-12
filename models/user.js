const mongoose = require('mongoose');


//Define the person schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
   
    mobile:{
        type: String,
        required: true
    },
    email:{
          type: String,
          required: true,
          unique: true
    },
    address:{
        type: String,
        required: true
    },
    AadharCardNumber:{
        required: true,
        unique: true,
        type: Number
    },
    password:{
        required: true,
        type: String
    },
    role:{
        type: String,
        enum:['Voter','Admin'],
        default: 'Voter'
    },

    isVoted:{
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;