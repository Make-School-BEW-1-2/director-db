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

// PUT: Add an additional director to a movie
router.put('/:movieId/:newDirectorId', (req, res) => {
  Director.findById(req.params.newDirectorId)
    .then((newDirector) => {
      if (newDirector) {
        Movie.findById(req.params.movieId)
          .then((movie) => {
            if (movie) {
              movie.directors.unshift(newDirector);
              movie.markModified('directors');
              movie.save();
              newDirector.movies.unshift(movie);
              newDirector.markModified('movies');
            } else {
              throw new Error('Movie doesn\'t exist');
            }
          }).catch((err) => {
            console.error(err);
            res.status(400).send(err);
          });
      } else {
        throw new Error('The Director doesn\'t exist');
      }
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

// DELETE: Removes a single movie
router.delete('/:movieId', (req, res) => {
  // find the movie to delete
  Movie.findById(req.params.movieId)
    .populate('directors')
    .then((movie) => {
      // if a movie was found
      if (movie) {
        for (let i = 0; i < movie.directors.length; i += 1) {
          const editMovie = movie;
          // If I edit a reference to model
          //  and save the model that holds the reference will the model be changed as well?
          editMovie.directors[i].movies =
            movie.directors[i].movies.filter(filterMovie => filterMovie._id !== movie._id);
          movie.markModified('directors');
          movie.save();
        }
        // remove the movie
        return Movie.findOneAndRemove({
          id: movie._id
        });
      }
      throw new Error('Could not find movie');
    }).then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

module.exports = router;
