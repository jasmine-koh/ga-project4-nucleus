const express = require('express');
const groups = express.Router();

const Group = require('../models/groups');

// ==================== GET ROUTES ====================

// get all 'GROUP' collection from DB
groups.get('/', (req, res) => {
  Group.find((err, allGroup) => {
    if (err) {
      console.log(err);
    }
    console.log(allGroup);
    res.send(allGroup);
  });
});

// get specific 'GROUP' from collection
groups.get('/:id', (req, res) => {
  Group.findById(req.params.id, (err, group) => {
    if (err) {
      console.log(err);
    }
    console.log(group);
    res.send(group);
  });
});

// ==================== ACTION ROUTES ====================

// ====== CREATE (POST) ======
groups.post('/', (req, res) => {
  Group.create(req.body, (err, createdGroup) => {
    if (err) {
      console.log(err);
    }
    console.log(createdGroup);
    res.send(createdGroup);
  });
});

// ====== EDIT (PUT) ======
groups.put('/:id', (req, res) => {
  Group.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedGroup) => {
      if (err) {
        console.log(err);
      }
      console.log('edited: ', updatedGroup);
      res.redirect('edited');
    },
  );
});

// ====== DELETE ======
groups.delete('/:id', (req, res) => {
  Group.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log('delete: ', data);
    res.send('deleted');
  });
});

module.exports = groups;
