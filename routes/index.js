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

router.get('/upload',function(req, res, next) {
  res.render('uploadFile', { title: '' });
});

module.exports = router;
