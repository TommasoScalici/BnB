module.exports = function(app, express) {

    require('../routes/apartment.routes.js')(app);
    require('../routes/reservation.routes.js')(app);
    require('../routes/user.routes.js')(app);
 
    app.get('/', function(req, res) {
        res.render("index", {pagetitle: "Home", path: "home"});
    });

};