module.exports = app => {
    const reservationController = require("../controllers/reservations.controller.js");
    var router = require("express").Router();

    router.post('/apartment/reservation', reservationController.create);
    

    app.use('/api/reservations', router);
};