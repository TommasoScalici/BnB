const Mapper = require('../utilities/request-model-mapper.js')
const Reservation = require('../models/reservation.js');

module.exports =
{
    renderReservations: (req, res) => {
        if(req.session.user === undefined || req.session.user === null)
            res.sendStatus(403);
        else
            res.render("index", {pagetitle: "Storico Prenotazioni", path: "reservations"});
    },

    summary: (req, res) =>{
        let reservation = new Reservation();
            reservation.stay_cost = req.query.staycost;
            reservation.apartment = req.query.apartmentid;
            // reservation.customer = req.session.user._id;
            // //reservation.host = req.body.apartament.host._id;
            reservation.checkin= req.body.checkin;
            reservation.checkout= req.body.checkout;
            reservation.guests= req.body.guests;
            // reservation.payment_method: req.body.paymentmethod,
            reservation.city_tax= req.query.citytax;
            reservation.cleaning_cost= req.query.cleaningcost;
            reservation.service_cost= req.query.servicecost;
            reservation.stay_cost = req.query.staycost;
        res.render("index", {pagetitle: "Riepilogo prenotazione", path: "reservation-summary",reservation}).populate("host");;
    },

    renderCheckout: (req, res) => {
         let reservation = new Reservation();
            reservation.stay_cost = req.query.staycost;

            res.render("index", {pagetitle:"Checkout", path:"checkout",reservation});
              
    },
    
    reserve: (req, res) => {

        let newReservation = new Reservation(Mapper.getReservationFromReq(req));

        Reservation.create(newReservation, function(err, reservation) {
            if(err)
                console.log(`Mongo error while user reserving an apartment: ${err}`);
            else
                res.send("Hai prenotato il tuo appartamento");
        })
    }
}