const Apartment = require('../models/apartment.js');

module.exports = 
{
    insert: (req, res) => {
        var newApartment = new Apartment({

            name: req.body.name,
            address:
            {
                 street: req.body.street,
                 city: req.body.city,
                 state: req.body.state,
                

            },
             price : req.body.price,
             description: req.body.description,
             vote : req.body.vote
             //votes : req.body.votes,
        });

        Apartment.create(newApartment, function(err, apartment) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else
                res.send("Hai inserito il tuo B&B!");
        });

        
    },

    delete:(req,res) =>
    {
        Apartment.remove({ _id: req.body.id }, function(err) {
            if (!err) {
                    message.type = 'Cancellato!';
            }
            else {
                    message.type = 'error';
            }
        });
    },
    
}