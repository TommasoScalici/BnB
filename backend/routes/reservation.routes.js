module.exports = app => {
    const reservationController = require("../controllers/reservations.controller.js");
    var router = require("express").Router();

    router.post('/reservation/:id', function(req,res){
        res.render("reservation", reservationController.create);
    })

    app.use('/api/reservation', router);
};