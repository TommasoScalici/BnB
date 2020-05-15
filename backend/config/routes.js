module.exports = function(app, express) {

    require('../routes/user.routes.js')(app);

    app.get('/', function(req, res) {
        res.render("index");
    });

    app.get('/test', function(req, res) {
        res.render("test");
    });
};