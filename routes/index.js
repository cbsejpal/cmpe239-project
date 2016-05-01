var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/welcome',function(req, res, next) {
  res.render('newIndex', { title: '' });
});

router.get('/results',function(req, res, next) {
  res.render('results', { title: '' });
});

module.exports = router;
