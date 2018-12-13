const express = require('express');
const controller = require('./auth.controller');


const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Implement authentication routes.
router.route('/');

router.post('/signup', (req, res) => {
  controller.signUp(req.body)
    .then((user) => {
      controller.logUserIn(res, user);
    }).catch((err) => {
      res.status(400).send(err);
    });
});

router.post('/login', (req, res) => {
  controller.authUser(req.body.username, req.body.password)
    .then((user) => {
      controller.logUserIn(res, user);
    }).catch((err) => {
      res.status(401).send(err);
    });
});

router.get('/logout', (req, res) => {
  res.clearCookie('directorDBToken');
  res.status(200).send();
});

module.exports = router;
