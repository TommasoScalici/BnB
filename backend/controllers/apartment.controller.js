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
                // res.status(201).json("Hai inserito il tuo B&B!");
                res.render("index", {pagetitle: "Inserimento Appartamento", path: "apartment-create",apartment});
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
                res.render("index", {pagetitle: "Appartamento", path: "apartment-details", apartment, apartments});  
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
                res.render("index", {pagetitle: "Lista Appartamenti", path: "apartments", apartments});
        });
    },
    
    // renderCreate: (req, res) => {
    //     res.render("index", {pagetitle: "Inserimento Appartamento", path: "apartment-create",apartment});
    // },

    searchApartments: async (req, res) => { 
        await Apartment.find({ province: req.query.location }, function(err, apartments) {
            if(err) {
                console.log(`Mongo error while retrieveing apartments data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
                res.render("index", {pagetitle: `Hai cercato alloggi a ${req.query.location}`, path: "apartments", apartments});
        });
    },



    upload:async(req,res) =>{

        let apartment = Mapper.getApartmentFromReq(req);
        let imagePath = `/apartment/images/${moment().format("YYYY-MM-DD_hh-mm-ss")}.jpg`;
        



    },

    update: async (req, res) => {

        let apartment = Mapper.getApartmentFromReq(req);
        let imagePath = `/apartment/images/${req.params.id}_${moment().format("YYYY-MM-DD_hh-mm-ss")}.jpg`;
        

        if(req.files) {
            let image = req.files.apartmentImage;
            image.mv(`./uploads${imagePath}`);
            apartment.photo = imagePath;  
        }

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
