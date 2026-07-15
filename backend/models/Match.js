const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  matchId: { type: String, unique: true, required: true },
  gameMode: { type: String, enum: ['FFA', 'TEAM', 'RANKED', 'CASUAL'], default: 'CASUAL' },
  status: { type: String, enum: ['WAITING', 'STARTED', 'COMPLETED', 'CANCELLED'], default: 'WAITING' },
  players: [{
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    eloRating: Number,
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 },
    damage: { type: Number, default: 0 },
    team: String,
    placement: Number,
  }],
  winner: { userId: mongoose.Schema.Types.ObjectId, username: String },
  duration: Number,
  map: String,
  startedAt: Date,
  endedAt: Date,
  eloChanges: [{ userId: mongoose.Schema.Types.ObjectId, eloChange: Number }],
  antiCheatFlags: [{ userId: mongoose.Schema.Types.ObjectId, flagType: String, severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'] } }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Match', matchSchema);