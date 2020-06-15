module.exports = app => {
    const reservationController = require("../controllers/reservation.controller.js");

    var router = require("express").Router();
    
    router.get("/", reservationController.renderReservations);
    router.get("/summary", reservationController.renderSummary);
    
    router.post("/reserve", reservationController.reserve);
    
    app.use("/reservations", router);
};  