const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const moment = require('moment');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');


module.exports = function(app, express) {

    app.locals.moment = moment;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload({ 
      createParentPath: true,
      debug: true
    }));

    app.use(morgan('dev'));
    
    app.use(session({
        secret: 'le brutte intenzioni la maleducazione',
        resave: false,
        saveUninitialized: true
      }));

    app.use(function(req, res, next) {
      res.locals.session = req.session;
      next();
    });

    app.set('views', path.join(__dirname, '../../frontend'));
    app.set('view engine', 'ejs');

    
    app.use(express.static(path.join(__dirname, '../../frontend')));
    app.use(express.static(path.join(__dirname, '../../uploads')));
};