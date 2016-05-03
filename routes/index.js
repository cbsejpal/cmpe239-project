var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/results',function(req, res, next) {
  res.render('results', { title: '' });
});

router.get('/upload',function(req, res, next) {
  res.render('uploadFile', { title: '' });
});

router.get('/datasets', function(req, res, next){
  res.render('datasets', { title: '' });
});

module.exports = router;
