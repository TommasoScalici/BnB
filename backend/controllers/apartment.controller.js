const fileUploader = require('../utilities/file-uploader.js');
const moment = require('moment');
const Mapper = require('../utilities/request-model-mapper.js')
const Apartment = require('../models/apartment.js');


module.exports = 
{
    create: async (req, res) => {

        let apartment = new Apartment(Mapper.getApartmentFromReq(req));

        if(req.files) {

            let filesPackages = Object.values(req.files);

            for(filePackage of filesPackages) {

                let i = 0;

                if(Array.isArray(filePackage)) {

                    for(file of filePackage) {
                        let filePath = `/uploads/apartments/images/${apartment._id}_${moment().format("YYYY-MM-DD_hh-mm-ss")}_${i}.jpg`;
                        await fileUploader(file, filePath, function(result) {
                            apartment.photo_paths.push(result);
                        });
                        
                        i++;
                    }
                }
                else {
                    let file = filePackage;
                    let filePath = `/uploads/apartments/images/${apartment._id}_${moment().format("YYYY-MM-DD_hh-mm-ss")}_${i}.jpg`;
                    await fileUploader(file, filePath, function(result) {
                        apartment.photo_paths.push(result);
                    });
                }
            }
        }

        await Apartment.create(apartment, function(err, apartment) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);   
            else 
                res.status(201).json("Apartment inserted sucesfully");
        });        
    },

    renderApartment: async (req, res) => {
        await Apartment.findById(req.params.id, async function(err, apartment) {
            if(err) {
                console.log(`Mongo error while retrieving apartment data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else {
                let apartments = await Apartment.find({"address.town": apartment.address.town})
                res.render("index", { pagetitle: "Appartamento", path: "apartment-details", apartment, apartments });
            }
                 
        }).populate("host");
    },
    
    renderInsertApartment: (req, res) => {
        if(req.session.user === undefined || req.session.user === null)
            res.sendStatus(403);
        else
            res.render("index", {pagetitle: "Inserimento Appartamento", path: "apartment-create"});
    },

    searchApartments: async (req, res) => {
        

        await Apartment.find({
            "guests_max": { $gte: req.query.guests },
            "address.country": req.query.country,
            "address.province": req.query.province,
            "address.town": req.query.town,
            ...req.query.price ? { price: { $lte: req.query.price } } : {},
            ...req.query.services ? { services: { $in: req.query.services } } : {},
            ...req.query.typeaccomodation ? { type_accomodation : req.query.typeaccomodation } : {},
        }, function(err, apartments) {
            if(err) {
                console.log(`Mongo error while retrieveing apartments data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
                res.render("index", {pagetitle: `Stai cercando alloggi a ${req.query.town}`, path: "apartments", apartments });
        })
    },
}
