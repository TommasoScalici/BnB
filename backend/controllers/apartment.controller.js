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

                    let filesPackages = Object.values(req.files);

                    for(filePackage of filesPackages) {

                        let fileNamePath = `${apartment._id}_${moment().format("YYYY-MM-DD_hh-mm-ss")}`;
                        let i = 0;

                        if(Array.isArray(filePackage)) {

                            for(file of filePackage) {
                                let path = `/apartments/images/${fileNamePath}_${i}.jpg`;
                                file.mv(`./uploads${path}`);
                                apartment.photo_paths.push(path);
                                i++;
                            }
                        }
                        else {
                            let file = filePackage;
                            let path = `/apartments/images/${fileNamePath}_${i}.jpg`;
                            file.mv(`./uploads${path}`);
                            apartment.photo_paths.push(path);
                        }
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
            else {

                await Apartment.find({
                    "address.country": { $regex: apartment.address.country },
                    "address.province": { $regex: apartment.address.province },
                    "address.town": { $regex: apartment.address.town },
                }, function(err, apartments) {
                    if(err) {
                        console.log(`Mongo error while retrieveing apartments data: ${err}`);
                        res.status(500).json({message: "Server error while processing the request"});
                    }
                    else
                        res.render("index", {pagetitle: `${apartment.name}`, path: "apartment-details", apartment, apartments});
                }).limit(4);
            }
        }).populate("host");
    },
    
    renderCreate: (req, res) => {
        if(!req.session.user || !req.session.user.is_host)
            res.sendStatus(403);
        else
            res.render("index", {pagetitle: "Inserimento Appartamento", path: "apartment-create"});
    },

    searchApartments: async (req, res) => {
        
        await Apartment.find({
            "guests_max": {  $gte: req.query.guests },
            "address.country": { $regex: req.query.country },
            "address.province": { $regex: req.query.province },
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
