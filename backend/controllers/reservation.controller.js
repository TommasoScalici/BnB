const Mapper = require('../utilities/request-model-mapper.js');
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

    summary: async (req, res) =>{
        let reservation = new Reservation();
        
        reservation.customer = req.session.user._id;
        // //reservation.host = req.body.apartament.host._id;
        reservation.checkin= req.query.checkin;
        reservation.checkout= req.query.checkout;
        reservation.guests= req.query.guests;
        reservation.guestsadults = req.query.guestsadults;
        reservation.guestschildren = req.query.guestschildren;
        reservation.guestsnewborns = req.query.guestsnewborns;

        // reservation.payment_method: req.body.paymentmethod,
        reservation.city_tax= req.query.citytax;
        reservation.cleaning_cost= req.query.cleaningcost;
        reservation.service_cost= req.query.servicecost;
        reservation.stay_cost = req.query.staycost;
        reservation.total = req.query.totalcost;

        await Apartment.findById(req.query.apartmentid, function(err, apartment) {
            if(err) {
                console.log(`Mongo error while retrieving apartment data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
            res.render("index", {pagetitle: "Riepilogo prenotazione", path: "reservation-summary", apartment, reservation }); 

        }).populate("host");
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