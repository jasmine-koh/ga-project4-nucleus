const express = require('express');
const lists = express.Router();

const models = require('../models/lists');

// get 'LIST' collection from DB
lists.get('/', (req, res) => {
  models.List.find((err, allList) => {
    if (err) {
      console.log(err);
    }
    console.log(allList);
    res.send(allList);
  });
});

// add a new list into 'LIST' collection
lists.post('/', (req, res) => {
  models.List.create(req.body, (err, createdList) => {
    if (err) {
      console.log(err);
    }
    console.log(createdList);
    res.send(createdList);
  });
});

// ====== DELETE ======
lists.delete('/:id', (req, res) => {
  models.List.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log('delete: ', data);
    res.send('deleted');
  });
});

module.exports = lists;
