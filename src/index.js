var express = require('express');
var util = require('util');
var logger = require('./common/apputils').logger;

//CONSTANTS
const PORT=3000;

//custom modules
var votesRoute = require('./votes/route.js');

var app = express();
app.set('port', process.env.PORT || PORT);

app.use('/votes', votesRoute);

// custom 404 page
app.use(function(req, res){
	logger.info('reached 404');
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){
	logger.error(util.format('reached 500: %s', err.stack));
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
  logger.info(util.format('started on http://localhost:%s', app.get('port')));
});

module.exports = app;
