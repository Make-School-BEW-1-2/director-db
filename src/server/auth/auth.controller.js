// #TODO: Implement authentication controller.
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const bcrypt = require('bcryptjs');
const User = require('./auth.model');


function logUserIn(res, user) {
  const token = jwt.sign({
    _id: user.idea
  }, config.jwtSecret, {
    expiresIn: '60 days'
  });
  res.cookie('directorDBToken', token, {
    maxAge: 900000,
    httpOnly: true
  });
  res.status(200).send();
}

function authUser(username, pass) {
  return new Promise((resolve, reject) => {
    User.findOne({
      username
    })
      .then((user) => {
        if (user) {
          comparePassword(pass, user.pass).then((match) => {
            if (match) {
              resolve(user);
            } else {
              reject('wrong username or password');
            }
          });
        } else {
          reject('wrong username or password');
        }
      }).catch((err) => {
        reject(err);
      });
  });
}

function comparePassword(inputPass, pass) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputPass, pass, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
}

function signUp(userData) {
  return new Promise((resolve, reject) => {
    const newUser = new User(userData);
    newUser.save().then((user) => {
      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  });
}

module.exports = {
  logUserIn,
  authUser,
  signUp
};
