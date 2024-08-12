const express = require('express');
const router = express.Router();
const User = require('./../models/user');


router.post('/signup', async(req,res)=>{
    try{
        const data = req.body;

        const newUser = new User(data);

        const response = await newUser.save();
        console.log('data saved');
        res.status(200).json({message:'user successfully created', user:response})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})
    }
})


module.exports = router;