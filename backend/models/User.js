const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  avatar: { type: String, default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default' },
  stats: {
    eloRating: { type: Number, default: 1200 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    totalMatches: { type: Number, default: 0 },
    winRate: { type: Number, default: 0 },
    bestEloRating: { type: Number, default: 1200 },
    totalKills: { type: Number, default: 0 },
    totalDeaths: { type: Number, default: 0 },
    averageKDA: { type: Number, default: 0 },
  },
  rank: { type: String, enum: ['Novice', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Legend'], default: 'Novice' },
  seasonStats: [{ season: String, eloRating: Number, wins: Number, losses: Number, rank: String }],
  preferences: { notifications: { type: Boolean, default: true }, theme: { type: String, enum: ['light', 'dark'], default: 'dark' } },
  isBanned: { type: Boolean, default: false },
  banReason: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);