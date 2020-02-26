const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  contact: {type: Number},
  email: {type: String},
  address: {type: String},
  groups: [{type: Schema.Types.ObjectId, ref: 'Group'}],
});

// set up list schema and model
const groupSchema = new Schema({
  name: {type: String},
  description: {type: String},
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const Group = mongoose.model('Group', groupSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  User: User,
  Group: Group,
};
