const Mapper = require('../utilities/request-model-mapper.js')
const Apartment = require('../models/apartment.js');


module.exports = 
{
    create: (req, res) => {
        var newApartment = new Apartment(Mapper.getApartmentFromReq(req));

        Apartment.create(newApartment, function(err, apartment) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else
                res.send("Hai inserito il tuo B&B!");
        });        
    },

    delete:(req,res) => {
        Apartment.remove({ _id: req.body.id }, function(err) {
            if (!err) {
                    message.type = 'Cancellato!';
            }
            else {
                    message.type = 'error';
            }
        });
    },

    getApartment: async (req, res) => {
        await Apartment.findById(req.params.id, function(err, apartment) 
        {
            if(err) {
                console.log(`Mongo error while updating user profile data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
                res.render("index", {pagetitle: "Appartamento", path: "apartment-details", apartment});       
        });
    },

    //getApartments: async () => { return (await Apartment.find({})).values; },
    
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
            else
                res.status(200).json({message: 'Apartment updated succesfully'});
        });
    }
}
