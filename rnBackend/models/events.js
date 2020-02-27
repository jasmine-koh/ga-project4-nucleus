const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up list schema and model
const eventSchema = new Schema({
  name: {type: String},
  description: {type: String},
  group: {type: String},
  location: {type: String},
  date: {type: Date},
  time: {type: String},
  available: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
