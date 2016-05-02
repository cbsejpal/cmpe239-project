var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');

var routes = require('./routes/index');
var clusters = require('./routes/clusters');
var fileio = require('./routes/fileio');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use('/', routes);
app.use('/addClusteredData', clusters);
*/

var router = require('./config/routes.js');
router.setupRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var connection = mongoose.connect("mongodb://localhost:27017/cmpe239");

//clusters.addClusteredData();
//fileio.getFiles();

var source = "prop";

/*request('http://localhost:3000/clusters/clusterData?source='+source, function(error, response, body){

  if(!error){
    console.log("done");
    //console.log(response);
    console.log(body);
  }

});*/

/*request('http://localhost:3000/clusters/addData', function(error, response, body){

  if(!error){
    console.log("done");
    //console.log(response);
    console.log(body);
  }

});*/


module.exports = app;
