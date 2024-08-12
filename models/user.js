const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


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
        type: String,
        required: true,
        unique: true
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

//password hashing middleware
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;