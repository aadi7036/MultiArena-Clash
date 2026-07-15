const express = require('express');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user._id, username: user.username, avatar: user.avatar, stats: user.stats, rank: user.rank, createdAt: user.createdAt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, { avatar }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/search/:query', async (req, res) => {
  try {
    const users = await User.find({ username: { $regex: req.params.query, $options: 'i' } }).limit(20).select('username avatar stats rank');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;