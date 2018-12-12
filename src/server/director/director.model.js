// #TODO: Implement thing.model.js.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  birthday: {
    type: Date
  },
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
  }]
});

module.exports = mongoose.model('Director', directorSchema);
