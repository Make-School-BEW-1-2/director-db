const express = require('express');
const Movie = require('./movie.model');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');

// #TODO: Implement thing.route.js.

// GET: Index/read a single movie
router.get('/:movieId', (req, res) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie) {
        res.status(200).send(movie);
      } else {
        res.status(404).send('Movie not found');
      }
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

module.exports = router;
