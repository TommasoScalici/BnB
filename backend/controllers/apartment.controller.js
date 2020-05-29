const Mapper = require('../utilities/request-model-mapper.js')
const Apartment = require('../models/apartment.js');


module.exports = 
{
    create: async (req, res) => {
        var newApartment = new Apartment(Mapper.getApartmentFromReq(req));

        await Apartment.create(newApartment, function(err, apartment) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else
                res.status(201).json("Hai inserito il tuo B&B!");
        });        
    },

    getApartment: async (req, res) => {
        await Apartment.findById(req.params.id, function(err, apartment) {
            if(err) {
                console.log(`Mongo error while retrieving apartment data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
             Apartment.find({}, function(err, apartments) {
                res.render("index", {pagetitle: "Appartamento", path: "apartment-details", apartment, apartments, navbar : "navbar"});  
            });     
        });
    },

    getApartments: async (req, res) => { 
        await Apartment.find({}, function(err, apartments) {
            if(err) {
                console.log(`Mongo error while retrieveing apartments data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
                res.render("index", {pagetitle: "Lista Appartamenti", path: "apartments", apartments, navbar : "navbar"});
        });
    },
    
    renderCreate: (req, res) => {
        res.render("index", {pagetitle: "Inserimento Appartamento", path: "apartment-create"});
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
            else
                res.status(200).json({message: 'Apartment updated succesfully'});
        });
    }
}
