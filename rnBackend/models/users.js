const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  contact: Number,
  email: String,
  address: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
