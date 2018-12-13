const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function preSave(next) {
  if (!this.isModified('pass')) {
    next();
  } else {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) {
        next();
      }
      bcrypt.hash(this.pass, salt, (hashError, hash) => {
        if (hashError) {
          next();
        }
        this.pass = hash;
        next();
      });
    });
  }
});

module.exports = mongoose.model('User', userSchema);
