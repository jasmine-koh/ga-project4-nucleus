const express = require('express');
const users = express.Router();
const models = require('../models/users');

users.get('/', (req, res) => {
  models.User.find((err, allItem) => {
    if (err) {
      console.log(err);
    }
    console.log(allItem);
    res.send(allItem);
  });
});

users.get('/:id', (req, res) => {
  models.User.findById(req.params.id)
    .populate('groups')
    .exec((err, users) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(users);
        res.send(users);
      }
    });
});

// ====== CREATE (POST) ======
users.post('/', (req, res) => {
  models.User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.send('user created');
  });
});

// ====== DELETE ======
users.delete('/:id', (req, res) => {
  models.User.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log('delete: ', data);
    res.send('deleted');
  });
});

module.exports = users;
