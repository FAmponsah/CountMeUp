"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var logger = require('./../common/apputils').logger;
var functions = require('./functions');
logger.debug('[votes] started loading...');

var router = express.Router();

router.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // for parsing application/x-www-form-urlencoded

router.post('/cast', functions.cast);
router.get('/results', functions.results);

logger.debug('[votes]...finished loading.');
module.exports = router;
