const express = require('express');
const events = express.Router();

const Event = require('../models/events');

// get 'EVENT' collection from DB
events.get('/', (req, res) => {
  Event.find((err, allEvent) => {
    if (err) {
      console.log(err);
    }
    console.log(allEvent);
    res.send(allEvent);
  });
});

// add a new event into 'EVENT' collection
events.post('/', (req, res) => {
  Event.create(req.body, (err, createdEvent) => {
    if (err) {
      console.log(err);
    }
    console.log(createdEvent);
    res.send(createdEvent);
  });
});

module.exports = events;
