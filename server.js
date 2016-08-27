'use strict';

//their modules
var express = require('express');
// var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var csrf = require('csurf');
var bodyParser = require("body-parser");
var serveStatic = require('serve-static');
//my modules
var logger = require('./utils/logger');
var sessionHelper = require('./utils/sessionHelper');
var routes = require('./routes/router');
var seedDB = require('./utils/seedDB');

//init
var app = express();

//public files
app.use(serveStatic(__dirname + '/public'));

//db
mongoose.connect('mongodb://localhost/battle-tour-api');


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://frshnss.be');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

//middleware
// app.use(favicon(__dirname + '/public/favicon.ico')); // serve favifon
app.set('view engine', 'ejs'); //set view engine to ejs
app.use(function(req, res, next) {
    logger.info(req.method, req.url); // log each request to the console
    next(); 
});
// app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse json
// app.use(bodyParser.json({ type: 'application/*+json' })); 
app.use(sessionHelper.sessionCookie);
// app.use(csrf());
// app.use(function(req, res, next) { 
//     res.locals.csrfToken = req.csrfToken(); 
//     next(); 
// }); 

//routes
app.use(routes);

//start server
app.listen(process.env.PORT, process.env.IP, function(req, res){
    seedDB.createDummyBattle();
    seedDB.createDummyBattle2();
    logger.info('Webserver started');
});