const moment = require('moment');
const Mapper = require('../utilities/request-model-mapper.js')
const Apartment = require('../models/apartment.js');

module.exports = 
{
    create: async (req, res) => {
        var newApartment = new Apartment(Mapper.getApartmentFromReq(req));

        await Apartment.create(newApartment, async function(err, apartment) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else {
                
                if(!!req.files) {

                let i = 0;
                let images = [].concat(req.files.photos);

                    for(let image of images) {
                        let path = `/apartment/images/${apartment._id}_${moment().format("YYYY-MM-DD_hh-mm-ss")}_${i}.jpg`;
                        image.mv(`./uploads${path}`);
                        apartment.photo_paths.push(path);
                        i++;
                    }
                }

                await Apartment.updateOne({_id: apartment._id}, apartment);
                res.status(201).json("Apartment inserted sucesfully");
            }
        });        
    },

    renderApartment: async (req, res) => {
        await Apartment.findById(req.params.id, async function(err, apartment) {
            if(err) {
                console.log(`Mongo error while retrieving apartment data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
                await Apartment.find({}, function(err, apartments) {
                res.render("index", {pagetitle: "Appartamento", path: "apartment-details", apartment, apartments}); 
            });
        }).populate("host");
    },
    
    renderCreate: (req, res) => {
        if(req.session.user === undefined || req.session.user === null)
            res.sendStatus(403);
        else
            res.render("index", {pagetitle: "Inserimento Appartamento", path: "apartment-create"});
    },

    searchApartments: async (req, res) => {

        req.session.searchdata = Mapper.getSearchDataFromReq(req);
        req.session.save();
        
        await Apartment.find({
            guests_max: {  $gte: req.query.guests },
            "address.country": { $regex: req.query.country },
            "address.postal_code": { $regex: req.query.postalcode },
            "address.province": { $regex: req.query.province },
            "address.street": { $regex: req.query.street },
            "address.street_number": { $regex: req.query.streetnumber },
            "address.town": { $regex: req.query.town },
        }, function(err, apartments) {
            if(err) {
                console.log(`Mongo error while retrieveing apartments data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
                res.render("index", {pagetitle: `Stai cercando alloggi a ${req.query.town}`, path: "apartments", apartments});
        });
    },
}
