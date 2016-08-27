'use strict';

//their modules
var express = require('express');
var serveStatic = require('serve-static');
//my modules
var logger = require('../utils/logger');
var battlesRouter = require('./battlesRouter');

var router = express.Router();
router.use('/battles', battlesRouter);

module.exports = router;