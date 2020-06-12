module.exports = app => {
    const reservationController = require("../controllers/reservation.controller.js");

    var router = require("express").Router();
    
    router.get("/", reservationController.renderReservations);
    router.post("/reservation", reservationController.reserve);
    
    app.use("/reservations", router);
};  