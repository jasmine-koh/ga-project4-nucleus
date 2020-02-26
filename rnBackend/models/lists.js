const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up items in list schema and model
const listitemSchema = new Schema({
  name: {type: String},
  status: {type: Boolean},
  listName: {type: String},
  listId: {type: Schema.Types.ObjectId, ref: 'List'},
});

// set up list schema and model
const listSchema = new Schema({
  name: {type: String},
  groups: {type: String},
  shared: {type: Boolean},
  available: [{type: Boolean}],
});

const List = mongoose.model('List', listSchema);
const ListItem = mongoose.model('ListItem', listitemSchema);

module.exports = {
  List: List,
  ListItem: ListItem,
};
