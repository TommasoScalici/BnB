
const userController = require("../controllers/user.controller.js");

module.exports = function(app, express) {

    require('../routes/user.routes.js')(app);

    // mi serve per testare
    var apartments = [
        {
            name: "Appartamento 1",
            price: 15.50,
            description: "Bellissimo appartamento vicino al mare",
        },
        {
            name: "Appartamento 2",
            price: 22,
            description: "Bellissimo appartamento in montagna",
        },
        {
            name: "Appartamento 3",
            price: 25.50,
            description: "Bellissimo appartamento in centro città, vicino la stazione, ecc.",
        },
        {
            name: "Appartamento 4",
            price: 19.90,
            description: "Casa di Pirrone",
        },
    ];
    // fine roba di test

    app.get('/', function(req, res) {
        res.render("index", {pagetitle: "Home", apartments: apartments});
    });

    app.get('/signin', function(req, res) {
        res.render("signin");
    });

    app.get('/signup', function(req, res) {
        res.render("signup");
    });
};