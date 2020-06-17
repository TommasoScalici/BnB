const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const moment = require('moment');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const db = require('./db.config')
const mongoDBStore = require('connect-mongodb-session')(session);

module.exports = function(app, express) {

    const sessionCollection = "bnb_sessions";
    const uri = process.env.MONGODB_URI || db.url;

    app.locals.moment = moment;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({  extended: true }));
    app.use(fileUpload({ 
      createParentPath: true,
    }));

    app.use(morgan('dev'));

    app.use(session({
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 365},
        httpOnly: true,
        secret: "le brutte intenzioni la maleducazione",
        resave: false,
        saveUninitialized: true,
        store: new mongoDBStore({
          collection: sessionCollection,
          uri: uri
        })
      }));
    
    console.log(`Sessions storage set to ${uri}/${sessionCollection}`)


    app.use(function(req, res, next) {
      res.locals.session = req.session;
      next();
    });

    app.set('views', path.join(__dirname, '../../frontend'));
    app.set('view engine', 'ejs');

    console.log("Using ejs view engine");
    
    app.use(express.static(path.join(__dirname, '../../frontend')));
    app.use(express.static(path.join(__dirname, '../../public')));
};