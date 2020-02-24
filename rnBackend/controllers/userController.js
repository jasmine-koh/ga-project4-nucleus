const express = require('express');
const users = express.Router();
const User = require('../models/users');

users.get('/', (req, res) => {
  User.find((err, allItem) => {
    if (err) {
      console.log(err);
    }
    console.log(allItem);
    res.send(allItem);
  });
});

users.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, item) => {
    if (err) {
      console.log(err);
    }
    console.log(item);
    res.send(item);
  });
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
