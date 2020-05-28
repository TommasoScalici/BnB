const Mapper = require('../utilities/request-model-mapper.js')
const Reservation = require('../models/reservation.js');
const User = require('../models/user.js');
const Apartment = require('../models/apartment.js');

module.exports =
{
    reserve: (req, res) => {
        //test
        console.log(req);

        var newReservation = new Reservation(Mapper.getReservationFromReq(req));

        Reservation.create(newReservation, function(err, reservation) {
            if(err)
                console.log(`Mongo error while user reserving an apartment: ${err}`);
            else
                res.send("Hai prenotato il tuo appartamento");
        })
    }
}