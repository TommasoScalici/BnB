module.exports = app => {
    const reservationController = require("../controllers/reservations.controller.js");
    var router = require("express").Router();

    router.post('/reservation/:id', reservationController.reserve);
    

    app.use('/api/reservations', router);
};  