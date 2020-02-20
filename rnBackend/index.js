const express = require('express');
const mongoose = require(`mongoose`);
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

// controllers
const userController = require('./controllers/userController');

// mongoose connection
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

// middleware
// parse application/json
app.use(bodyParser.json());

app.use('/users', userController);

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
