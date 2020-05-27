const Reservation = require('../models/reservation.js');
const User = require('../models/user.js');
const Apartment = require('../models/apartment.js');

module.exports =
{
    create: (req, res) =>{
            var newReservation = new Reservation({
                
            user: req.session.user._id,
            apartment: req.session.apartment._id

            });

            Reservation.create(newReservation, function(err, reservation) {
                if(err)
                    console.log(`Mongo error while user was signing up: ${err}`);
                else
                    res.send("Hai prenotato il tuo appartamento");
            });
    } 
}