
const userController = require("../controllers/user.controller.js");

module.exports = function(app, express) {

    require('../routes/user.routes.js')(app);

    app.get('/', function(req, res) {
        res.render("index");
    });

    app.get('/signin', function(req, res) {
        res.render("signin");
    });

    app.get('/signup', function(req, res) {
        res.render("signup");
    });
};