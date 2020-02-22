const express = require('express');
const items = express.Router();
const models = require('../models/lists');

// get 'ITEMS' collection from DB
items.get('/', (req, res) => {
  models.ListItem.find((err, allItem) => {
    if (err) {
      console.log(err);
    }
    console.log(allItem);
    res.send(allItem);
  });
});

items.get('/:id', (req, res) => {
  models.ListItem.findById(req.params.id, (err, item) => {
    if (err) {
      console.log(err);
    }
    console.log(item);
    res.send(item);
  });
});

// add a new item into 'ITEMS' collection
items.post('/', (req, res) => {
  models.ListItem.create(req.body, (err, createdItem) => {
    if (err) {
      console.log(err);
    }
    console.log(createdItem);
    res.send('item added');
  });
});

items.delete('/:id', (req, res) => {
  models.ListItem.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log('delete: ', data);
    res.send('deleted');
  });
});

module.exports = items;
