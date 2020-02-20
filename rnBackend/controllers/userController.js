const express = require('express');
const users = express.Router();
const User = require('../models/users');

users.get('/', (req, res) => {
  res.send('This is a user route');
  console.log(req.body);
});

// update user profile
users.post('/', (req, res) => {
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.send('user created');
  });
});

module.exports = users;
