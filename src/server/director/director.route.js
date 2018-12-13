const express = require('express');
const Director = require('./director.model');
const movieRouter = require('../movie/movie.route');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/');
router.use('/:directorId/movies', movieRouter);

// #TODO: Implement thing.route.js.

// GET: Index/read all directors
router.get('/', (req, res) => {
  Director.find({})
    .then((directors) => {
      res.status(200).json(directors);
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

// GET: Index a specific director
router.get('/:directorId', (req, res) => {
  Director.findById(req.params.directorId)
    .populate('movies')
    .then((director) => {
      if (director) {
        res.status(200).send(director);
      } else {
        res.status(404).send('Director not found');
      }
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

// POST: Create a new director
router.post('/', (req, res) => {
  const newDirector = new Director(req.body);
  newDirector.save()
    .then((director) => {
      res.status(200).send(director);
    }).catch((err) => {
      console.error(err);
      res.status(400).send(err);
    });
});

module.exports = router;
