const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authorize } = require('../middleware/roleMiddleware');
const {protect}=require('../middleware/authMiddleware')

// Get logged in user profile
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin route
// Route accessible only by admin
router.get('/admin', protect, authorize(['admin']), async (req, res) => {
    res.status(200).json({ message: 'Admin content' });
});

// Route accessible by admin and editor
router.get('/editor', protect, authorize(['admin', 'editor']), async (req, res) => {
    res.status(200).json({ message: 'Editor content' });
});

// Route accessible by all authenticated users
router.get('/dashboard', protect, async (req, res) => {
    res.status(200).json({ message: 'Dashboard content' });
});

// Route accessible by admin and viewer
router.get('/viewer', protect, authorize(['admin', 'viewer']), async (req, res) => {
    res.status(200).json({ message: 'Viewer content' });
});
module.exports = router;
