const express = require('express');
const router = express.Router();
const User = require('./../models/user');

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

module.exports = router;
