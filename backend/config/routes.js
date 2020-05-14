// Qui ci andremo a fare il require di tutti i controllers, tipo
// var apartmentController = require('../controllers/apartmentController.js');
var userController = require('../controllers/userController.js');

// e così via...

module.exports = function(app, express) {

    app.get('/', function(req, res) {
        res.render("index");
    });

    app.get('/test', function(req, res) {
        res.render("test");
    });

    app.post('/signup', userController.signup);
};