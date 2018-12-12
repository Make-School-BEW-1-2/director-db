const express = require('express');
const directorRoutes = require('./server/director/director.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Change to your model.
router.use('/directors', directorRoutes);

router.use('/auth', authRoutes);

module.exports = router;
