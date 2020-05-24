const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');

module.exports = function(app, express) {

    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

<<<<<<< HEAD
    

    app.set('views', path.join(__dirname, '../../frontend/template'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
=======
    app.use(session({
        secret: 'le brutte intenzioni la maleducazione',
        resave: false,
        saveUninitialized: true
      }))

    app.set('views', path.join(__dirname, '../../frontend'));
    app.set('view engine', 'ejs');
>>>>>>> f3f3a50c8c854c71ae0f595c5ddd28e5f57842c3

    app.use(express.static(path.join(__dirname, '../../frontend')));
    //app.use(express.static(path.join(__dirname, '../../frontend/template/.')));
};