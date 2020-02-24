const express = require('express');
const events = express.Router();

const Event = require('../models/events');

// ==================== GET ROUTES ====================

// get all 'EVENT' collection from DB
events.get('/', (req, res) => {
  Event.find((err, allEvent) => {
    if (err) {
      console.log(err);
    }
    console.log(allEvent);
    res.send(allEvent);
  });
});

// get specific 'EVENT' from collection
events.get('/:id', (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      console.log(err);
    }
    console.log(event);
    res.send(event);
  });
});

// ==================== ACTION ROUTES ====================

// ====== CREATE (POST) ======
events.post('/', (req, res) => {
  Event.create(req.body, (err, createdEvent) => {
    if (err) {
      console.log(err);
    }
    console.log(createdEvent);
    res.send(createdEvent);
  });
});

// ====== EDIT (PUT) ======
events.put('/:id', (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedEvent) => {
      if (err) {
        console.log(err);
      }
      console.log('edited: ', updatedEvent);
      res.redirect('edited');
    },
  );
});

// ====== DELETE ======
events.delete('/:id', (req, res) => {
  Event.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log('delete: ', data);
    res.send('deleted');
  });
});

module.exports = events;