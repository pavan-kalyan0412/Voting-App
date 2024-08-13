const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../authMiddleware');


router.post('/signup', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the user data
        console.log(data.AadharCardNumber);
        // Check if all required fields are present
        if (!data.AadharCardNumber) {
            return res.status(400).json({ error: 'Aadhar Card Number is required' });
        }


        //Validate the Aadhar Card Number must have exactly 12 digits
        if (!/^\d{12}$/.test(data.AadharCardNumber)) {
            return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
        }

        // Check if a user with the same Aadhar Card Number already exists
        const existingUser = await User.findOne({ AadharCardNumber: data.AadharCardNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
        }


        // Check if there is already an admin user
        const adminUser = await User.findOne({ role: 'Admin' });
        if (data.role === 'Admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        // Check if a user with the same email already exists
        const existingEmail = await User.findOne({ email: data.email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

      

        const newUser = new User(data);
        const response = await newUser.save();
        console.log('Data saved');
        res.status(200).json({ message: 'User successfully created', user: response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req,res) =>{
    try{
        const {AadharCardNumber, password} = req.body;

        //validate the input
        if(!AadharCardNumber || !password) {
            return res.status(400).json({error:' Aadhar Card Number and password are required'})
        }

        //Find the user by Aadhar card Number
        const user = await User.findOne({ AadharCardNumber });
        if(!user){
            return res.status(400).json({error: 'invalid Aadhar Card Number or password'})
        }

        //compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error:'Invalid Aadhar Card Number or password '})
        }


        //generate a jwt token
        const token = jwt.sign(
            {userId: user.id, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
        );

        //if Login is successfull, return a success message
        res.status(200).json({ message:'Login successful', token});


    } catch(err){
        console.log(err);
        res.status(500).json({error: 'invalid server error'})
    }
})

router.get('/profile', authenticateToken, async(req,res)=>{
    try{
        res.status(200).json({message:'access granted to the protected route'})
    } catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.post('/change-password', authenticateToken, async (req,res)=>{
    try{
        const { oldPassword, newPassword} = req.body;
        const userId = req.user.userId;

        //Find the user by their ID
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({error:'User not found'})
        }

        //verify the old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({error:'old password is incorrect'})
        }

        //Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        //update the passwprd in the database
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
