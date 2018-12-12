// #TODO: Implement thing.model.js.
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  directors: {
    type: Schema.Types.ObjectId,
    ref: 'Director',
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
