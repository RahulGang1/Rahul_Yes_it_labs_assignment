const express = require('express');
const User = require('../models/User');
const authenticate = require('../MiddlerWare/authMiddlerware');

const router = express.Router();

// Get all users (GET)
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update user (PUT)
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'You can only edit your own data' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user (DELETE)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
