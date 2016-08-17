var express = require('express');
var router = express.Router();

let counter = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', counter: counter });
});

router.get('/ajax-counter', function(req, res, next) {
  counter += 1;
  res.json({ counter: counter });
});

router.put('/ajax-counter', function(req, res, next) {
  counter = Number(req.body.counter);
  res.redirect('/');
});

module.exports = router;
