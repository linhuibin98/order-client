const { Schema, model } = require('mongoose');

let collectionSchema = new Schema({
  user_id: {
    type: Number,
    default: 10000,
    autoIndex: true,
  },
  collections: {
    type: Array,
    default: []
  }
});

const collectionModel = model('user', collectionSchema);

module.exports = collectionModel;