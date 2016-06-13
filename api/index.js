var express = require('express');  
var app = express();  
var config = require('./config');
var port     = process.env.PORT || config.port;
var mongoose = require('mongoose');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');


mongoose.connect(config.db);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../app/public'));
require('./auth')(app);
require('./entry')(app);
require('./validation')(app);

app.listen(port);
console.log('Juntos Somos Un Bosque en puerto ' + port);
