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

router.get('/analysis', function(req, res, next){
  res.render('defectAnalysis', { title: '' });
});

router.get('/ckmetrics', function(req, res, next){
  res.render('ckmetrics', { title: '' });
});

router.get('/futurework', function(req, res, next){
  res.render('futurework', { title: '' });
});

module.exports = router;
