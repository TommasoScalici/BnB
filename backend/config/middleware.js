const bodyParser = require('body-parser');
const ejs = require('ejs');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
var passport=require('passport');


module.exports = function(app, express) {

    app.use(morgan('dev'));
    //require('./config/passport')(passport);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

     app.use(session({  //devo mettere qui il res e provare
         secret: 'le brutte intenzioni la maleducazione',
         resave: false,
         saveUninitialized: true
       }))

    // app.use(function (req, res, next) {          //quello che volevo fare
    //   res.locals.login = req.isAuthenticated();
    //   next();
    //   res.redirect("/")
    // });
   
    
    app.set('views', path.join(__dirname, '../../frontend'));
    app.set('view engine', 'ejs');

    app.use(express.static(path.join(__dirname, '../../frontend')));

};