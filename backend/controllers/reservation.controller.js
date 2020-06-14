const mongoose = require('mongoose');
const Apartment = require('../models/apartment.js');
const Reservation = require('../models/reservation.js');

module.exports =
{
    renderReservations: (req, res) => {
        if(req.session.user === undefined || req.session.user === null)
            res.sendStatus(403);
        else
            res.render("index", {pagetitle: "Storico Prenotazioni", path: "reservations"});
    },

    renderSummary: async (req, res) =>{
        let guests = req.query.guests;
        let guests_adults = req.query.guestsadults;
        let guests_children = req.query.guestschildren;
        let guests_newborns = req.query.guestsnewborns;

        let reservation = new Reservation();

        reservation.customer = req.session.user._id;

        reservation.checkin= req.query.checkin;
        reservation.checkout= req.query.checkout;

        reservation.city_tax= req.query.citytax;
        reservation.cleaning_cost= req.query.cleaningcost;
        reservation.service_cost= req.query.servicecost;
        reservation.stay_cost = req.query.staycost;

        await Apartment.findById(req.query.apartmentid, function(err, apartment) {
            if(err) {
                console.log(`Mongo error while retrieving apartment data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else {
                reservation.apartment = apartment._id;
                reservation.host = apartment.host._id;
                res.render("index", {pagetitle: "Riepilogo prenotazione", path: "reservation-summary", 
                            apartment, reservation, guests, guests_adults, guests_children, guests_newborns});
            }

        }).populate("host");
    },

    renderCheckout: (req, res) => {
         let reservation = new Reservation();
            reservation.stay_cost = req.query.staycost;

            res.render("index", {pagetitle:"Checkout", path:"checkout",reservation});   
    },
    
    reserve: (req, res) => {

        let reservation = new Reservation(JSON.parse(req.body.reservation));

        reservation.payment_method = req.body.payment_method;

        // Reservation.create(newReservation, function(err, reservation) {
        //     if(err) {
        //         console.log(`Mongo error while user reserving an apartment: ${err}`);
        //         res.status(500).json({message: "Server error while processing the request"});
        //     }
        //     else
        //         res.send("Hai prenotato il tuo appartamento");
        // })
    }
}