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

    renderReservation: (req, res) => {
        res.render("index", {pagetitle:"Prenotazione", path:"reservation-form"})
    },

    renderReview: (req, res) => {
        res.render("index", {pagetitle:"Prenotazione", path:"reservation-review"})
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