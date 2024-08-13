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

// Route to vote for a candidate
router.post('/vote/:candidateId', authenticateToken, async (req, res) => {
    try {
        const { candidateId } = req.params;
        const userId = req.user.userId;

        // Check if the user has already voted
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.isVoted) {
            return res.status(400).json({ error: 'User has already voted' });
        }

        // Find the candidate and update vote count
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Update candidate's vote count and add the vote
        candidate.voteCount += 1;
        candidate.votes.push({ user: userId });

        // Save the candidate
        const updatedCandidate = await candidate.save();

        // Update user's voting status
        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: 'Vote recorded successfully', candidate: updatedCandidate });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to get all candidates sorted by voteCount in descending order
router.get('/candidates', async (req, res) => {
    try {
        // Find all candidates and sort them by voteCount in descending order
        const candidates = await Candidate.find()
            .sort({ voteCount: -1 }) // Sort by voteCount in descending order
            .populate('votes.user', 'name email'); // Populate the user field in votes with name and email

        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/candidates-list',async(req,res)=>{
    try {
        //find all candidates and project only name and party fields
        const candidates = await Candidate.find({}, 'name party');

        res.status(200).json(candidates);
    } catch (error) {
        console.error(err);
        rs.status(500).json({error:'internal server error'});
        
    }
})

module.exports = router;