
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, enum: ['reserved', 'purchased'], default: 'reserved' }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
