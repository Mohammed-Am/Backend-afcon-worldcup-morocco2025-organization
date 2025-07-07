
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow credentials and specific origin
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
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

module.exports = app;
