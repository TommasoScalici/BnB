module.exports = function(app, express) {

    require('../routes/apartment.routes.js')(app);
    require('../routes/user.routes.js')(app);
 
    app.get('/', async function(req, res)
     {
        // Richiamare un modello da qui è concettualmente sbagliato ma non ho trovato altre soluzioni per ora
        await require('../models/apartment.js').find({}, function(err, apartments) {
            res.render("index", {pagetitle: "Home", path: "home", apartments});
        });
    });


    // Routes User

    app.get('/logout', function(req, res) {
        res.redirect('/api/users/logout');
    });

    app.get('/profile', function(req, res) {
        res.render("index", {pagetitle: "Gestione Profilo", path: "profile"});
    });

    app.get('/signup', function(req, res) {
        res.render("index", {pagetitle: "Registrazione", path: "signup"});
    });


    // Routes Apartment

    app.get("/apartments/create", function(req,res)
    {
        res.render("index", {pagetitle:"Inserimento Appartamento", path:"apartment-create"});
    });
};