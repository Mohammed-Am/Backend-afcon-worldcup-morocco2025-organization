
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS to allow credentials and specific origin
//vercel vercel
const allowedOrigins = [
  'https://frontend-afcon-worldcup-morocco2025.vercel.app',
  /^https:\/\/frontend-afcon-worldcup-morocc-.*-mohammed-ams-projects\.vercel\.app$/
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowedOrigin => 
      typeof allowedOrigin === 'string' 
        ? allowedOrigin === origin 
        : allowedOrigin.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
