module.exports = app => {
    const reservationController = require("../controllers/reservation.controller.js");

    var router = require("express").Router();
    
    router.get("/", reservationController.renderReservations);
    router.get("/summary", reservationController.summary);
    router.get("/checkout", reservationController.renderCheckout);
    
    app.use("/reservations", router);
};  