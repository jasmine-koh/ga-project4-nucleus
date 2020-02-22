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

module.exports = items;
