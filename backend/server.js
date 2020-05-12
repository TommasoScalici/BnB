var express = require('express');
var middleware = require('./config/middleware.js');
var routes = require('./config/routes');

var app = express();

middleware(app, express);
routes(app, express);

module.exports = app;