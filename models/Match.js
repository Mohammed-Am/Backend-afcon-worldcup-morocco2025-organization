
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  score: { teamA: Number, teamB: Number },
  status: { type: String, enum: ['upcoming', 'live', 'finished'], default: 'upcoming' }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
