const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up list schema and model
const groupSchema = new Schema({
  name: {type: String},
  description: {type: String},
  members: [{type: String}],
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
