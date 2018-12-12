// #TODO: Implement thing.model.js.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const directorSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Director', directorSchema);
