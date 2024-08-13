const express = require('express');
const router = express.Router();
const Candidate = require('./../models/candidate');
const User = require('./../models/user');
const authenticateToken = require('../authMiddleware');

const isAdmin = async (req,res, next) =>{
    try{
        const user = await User.findById(req.user.userId);
        if(user && user.role === 'Admin') {
            next();
        }else{
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Route to add a candidate
router.post('/add-candidate', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { name, party, age } = req.body;

        // Create a new candidate
        const newCandidate = new Candidate({
            name,
            party,
            age
        });

        // Save the candidate to the database
        const savedCandidate = await newCandidate.save();

        res.status(201).json({ message: 'Candidate added successfully', candidate: savedCandidate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;