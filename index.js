
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow credentials and specific origin
//vercel vercel
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const usersRouter = require('./routes/users');
const teamsRouter = require('./routes/teams');
const matchesRouter = require('./routes/matches');
const ticketsRouter = require('./routes/tickets');

app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/matches', matchesRouter);
app.use('/tickets', ticketsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the AFCON 2025 API!');
});

module.exports = app;
