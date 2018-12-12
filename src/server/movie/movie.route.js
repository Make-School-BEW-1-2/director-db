const express = require('express');
const Movie = require('./movie.model');
const Director = require('../director/director.model');

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

// POST: Create a new movie
router.post('/new', (req, res) => {
  const newMovie = new Movie(req.body);
  Director.findById(req.params.directorId)
    .then((director) => {
      newMovie.directors.unshift(director);
      newMovie.save();
      director.movies.unshift(newMovie);
      director.markModified('movies');
      director.save();
      res.status(200).send(director);
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

module.exports = router;
