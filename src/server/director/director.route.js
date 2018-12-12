const express = require('express');
const Director = require('./director.model');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');

// #TODO: Implement thing.route.js.

// GET: Index/read all directors
router.get('/', (req, res) => {
  Director.find({})
    .then((directors) => {
      res.status(200).send(directors);
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

module.exports = router;
