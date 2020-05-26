const Apartment = require('../models/apartment.js');

module.exports = function(app, express) {

    require('../routes/user.routes.js')(app);
    require('../routes/apartment.routes.js')(app);

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

    // var stream = Apartment.find().cursor()
    // cursor.on('error', function (err) {
    // console.error(err)
    // })
    // stream.on('data', function (doc) {
    //  console.log(doc)
    // })
    
    // Apartment.find().stream()
    // .on('data', function(doc){
    //   apartments.push(convert(doc));
    // })
    // .on('error', function(err){
    //   // handle error
    // })
    // .on('end', function(){
    //     cb (null, emotions)
    // });


    const apartment =  Apartment.find(function (err, apartment) {
        if (err) return console.error(err);
        console.log(apartment);
        return
      });

    const list = apartment.exec();
        console.log(list);

    app.get('/', function(req, res) {
        res.render("index", {pagetitle: "Home", path: "home", apartments: apartments});
    });

    app.get('/logout', function(req, res) {
        res.redirect('/api/users/logout');
    });

    app.get('/signup', function(req, res) {
        res.render("index", {pagetitle: "Registrazione", path: "signup"});
    });

    app.get("/insert", function(req,res)
    {
        res.render("insertApartment");
    });

};