const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

module.exports = function(app, express) {

    app.use(cookieParser());
    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.set('views', path.join(__dirname, '../../frontend'));
    app.set('view engine', 'ejs');

    app.use(express.static(path.join(__dirname, '../../frontend')));
    app.use(express.static(path.join(__dirname, '../../frontend/template/.')));
};