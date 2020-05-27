const Apartment = require('../models/apartment.js');

module.exports = function(app, express) {

    require('../routes/user.routes.js')(app);
    require('../routes/apartment.routes.js')(app);


    app.get('/', async function(req, res)
     {
        await Apartment.find({}, function(err, apartments) {
            res.render("index", {pagetitle: "Home", path: "home", apartments: apartments});
        });
    });

    app.get('/logout', function(req, res) {
        res.redirect('/api/users/logout');
    });

    app.get('/profile', function(req, res) {
        res.render("index", {pagetitle: "Gestione Profilo", path: "profile"});
    });

    app.get('/signup', function(req, res) {
        res.render("index", {pagetitle: "Registrazione", path: "signup"});
    });

    app.get("/insert", function(req,res)
    {
        res.render("index",{pagetitle:"Inserimento Appartamento", path:"insertApartment"});
    });

};