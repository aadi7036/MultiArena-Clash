const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  username: String,
  rank: Number,
  eloRating: Number,
  wins: Number,
  losses: Number,
  winRate: Number,
  totalMatches: Number,
  lastUpdated: { type: Date, default: Date.now },
  season: { type: String, default: 'current' },
  region: { type: String, default: 'global' },
});

leaderboardSchema.index({ eloRating: -1, lastUpdated: -1 });
leaderboardSchema.index({ season: 1, region: 1 });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);