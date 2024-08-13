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

//route to update a candidate
router.put('/update-candidate/:id', authenticateToken, isAdmin, async(req,res)=>{
    try {
        const {id} = req.params;
        const updateData = req.body;

//Find the candidate by ID andupdate with the new data
  const updatedCandidate = await Candidate.findByIdAndUpdate(id, updateData, { new: true})
  
  if(!updatedCandidate){
    return res.status(404).json({ error: 'candidate not found'});
  }

  res.status(200).json({ message:'Candidate updated successfully', candidate: updatedCandidate});
    } catch(err){
        console.error(err);
            res.status(500).json({ error:'internal server error'})
    }
})
// Route to delete a candidate
router.delete('/delete-candidate/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Find the candidate by ID and delete
        const deletedCandidate = await Candidate.findByIdAndDelete(id);

        if (!deletedCandidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;