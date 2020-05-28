const Reservation = require('../models/reservation.js');
const User = require('../models/user.js');
const Apartment = require('../models/apartment.js');

module.exports =
{
    reserve: async (req, res) =>{
            var newReservation = new Reservation({
                
            user: req.session.user._id,
            apartment: req.params.id,
            startVacation: req.body.startVacation,
            endVacation: req.body.endVacation,
            reservationDate: new Date()

            });

            Reservation.create(newReservation, function(err, reservation) {
                if(err)
                    console.log(`Mongo error while user reserving an apartment: ${err}`);
                else
                    res.send("Hai prenotato il tuo appartamento");
            });
    }

   
            

}