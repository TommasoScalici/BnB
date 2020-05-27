const Apartment = require('../models/apartment.js');
const Mapper = require('../utilities/request-model-mapper.js')

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

    apartments: async (req,res) =>
    {
        await Apartment.findById(req.params.id, function(err, doc) 
        {
            if(err) {
                console.log(`Mongo error while updating user profile data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            
            res.render("index", {pagetitle: "Appartamento", path: "viewApartment", apartment : doc });
                
        });
        
    },
    
    update: async (req, res) => {

        let apartment = Mapper.getApartmentFromReq(req);

        // Questa roba in pratica mi serve per eliminare eventuali valori undefined che arrivano dal form e che andrebbero
        // a sostituire i valori già salvati nel DB.
        Object.keys(apartment).forEach(key => apartment[key] === undefined && delete apartment[key]);

        await Apartment.findByIdAndUpdate(req.params.id, apartment, function(err, doc) {

            if(err) {
                console.log(`Mongo error while updating user profile data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else {
                res.status(200).json({message: 'Apartment profile updated succesfully'});
                req.session.apartment = apartment;
            }
        });
    }
}
