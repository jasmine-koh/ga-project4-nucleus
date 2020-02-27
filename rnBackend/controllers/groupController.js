const express = require('express');
const groups = express.Router();

const models = require('../models/users');

// ==================== GET ROUTES ====================

// get all 'GROUP' collection from DB
groups.get('/', (req, res) => {
  models.Group.find((err, allGroup) => {
    if (err) {
      console.log(err);
    }
    console.log(allGroup);
    res.send(allGroup);
  });
});

// get specific 'GROUP' from collection
groups.get('/:id', (req, res) => {
  models.Group.findById(req.params.id)
    .populate('members')
    .exec((err, group) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(group);
        res.send(group);
      }
    });
});

// ==================== ACTION ROUTES ====================

// ====== CREATE (POST) ======
groups.post('/', (req, res) => {
  models.Group.create(req.body, (err, createdGroup) => {
    if (err) {
      console.log(err);
    } else {
      let groupID = {_id: createdGroup._id};
      let options = {new: true};
      // get groups user then find user in user table and update
      console.log('MEMBERS', createdGroup.members);
      for (let i = 0; i < createdGroup.members.length; i++) {
        models.User.findByIdAndUpdate(
          createdGroup.members[i],
          {
            $push: {
              groups: groupID,
            },
          },
          options,
          (err, updatedUser) => {
            if (err) {
              console.error(err);
            } else {
              console.log(updatedUser);
            }
          },
        );
      }
      res.send(createdGroup);
    }
  });
});

// ====== EDIT (PUT) ======
groups.put('/:id', (req, res) => {
  models.Group.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedGroup) => {
      if (err) {
        console.log(err);
      }
      console.log('edited: ', updatedGroup);
      res.send('edited group');
    },
  );
});

// ====== DELETE ======
groups.delete('/:id', (req, res) => {
  models.Group.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log('delete: ', data);
    res.send('deleted');
  });
});

module.exports = groups;
