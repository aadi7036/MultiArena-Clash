const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Missing required fields' });

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(409).json({ error: 'User already exists' });

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ error: 'Invalid credentials' });
    if (user.isBanned) return res.status(403).json({ error: `Account banned: ${user.banReason}` });

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar, stats: user.stats, rank: user.rank },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/refresh', authenticateToken, (req, res) => {
  const token = jwt.sign(
    { userId: req.user.userId, username: req.user.username, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  res.json({ token });
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;