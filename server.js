/**
 * Main server file, connecting to backend database and available service calls.
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var config = require('./config/');
var logger = require('./utils/logUtil').logger;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
* Creating a connection to mongo db
*/
mongoose.connect(config.mongodb.url, function(err){
    if(err) logger.error("Error in connecting to mongo DB" + err);
    else logger.info("Connected to MongoDB");
});



/**
 * Middleware configuration for the application, starting off with the request header Authorization,
 * to check if the header has Authorization headers. If yes proceed further or send Unauthorized response to the requestor.
 */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    if (req.headers['authorization']) {
        next();
    } else {
        res.send('Not Authorized');
    }
});
/**
 * Middleware request body parser and method overrider configuration.
 */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('combined'));

app.use('/api/v1', require('./routes/routes.js'));

http.listen(config.config.port, function(err) {
    if (err) {
        logger.error('Error in starting the port at ' + config.config.port);
    } else {
        logger.info('Listening on port ' + config.config.port);
    }
});
