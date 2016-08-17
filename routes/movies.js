var express = require('express');
var Movie = require('../models/movie');
var router = express.Router();

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// INDEX
router.get('/', function(req, res, next) {
  var movieFilter = {};

  if (req.query.genre) {
    movieFilter.genre = req.query.genre;
  }
  if (req.query.year) {
    movieFilter.year = req.query.year;
  }

  console.log('movieFilter:', movieFilter);
  Movie.find(movieFilter)
  .then(function(movies) {
    res.render('movies/index', { movies: movies });
  });
});

module.exports = router;
