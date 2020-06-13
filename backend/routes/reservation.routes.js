module.exports = app => {
    const reservationController = require("../controllers/reservation.controller.js");

    var router = require("express").Router();
    
    router.get("/", reservationController.renderReservations);
    router.post("/reservation", reservationController.reserve);

    router.route("/checkout")
    .get(reservationController.renderCheckout)
    // .post(reservationController.reserve);

    router.get("/checkout", reservationController.renderCheckout);
    
    app.use("/reservations", router);
};  