const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up list schema and model
const eventSchema = new Schema({
  name: {type: String},
  description: {type: String},
  group: {type: String},
  location: {type: String},
  date: {type: String},
  time: {type: String},
  available: [{type: String}],
  selected: {type: String},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
