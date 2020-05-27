const Reservation = require('../models/reservation.js');

module.exports =
{
    create: (req, res) =>{
            var newReservation = new Reservation({
    
                user: req.body.userid,
                password: req.body.password,
                name: {
                    first: req.body.fname,
                    last: req.body.lname
                },
                
                birthdate: req.body.birthdate,
                sex: req.body.sex,
                telephone: req.body.telephone
            });
    
            User.create(newUser, function(err, user) {
                if(err)
                    console.log(`Mongo error while user was signing up: ${err}`);
                else
                    res.send("Ti sei iscritto!");
            });
        }
    } 
}