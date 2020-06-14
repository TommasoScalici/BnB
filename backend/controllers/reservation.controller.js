const moment = require('moment');
const nodemailer = require('nodemailer');
const Apartment = require('../models/apartment.js');
const Reservation = require('../models/reservation.js');

module.exports =
{
    renderReservations: (req, res) => {
        if(req.session.user === undefined || req.session.user === null)
            res.sendStatus(403);
        else
            res.render("index", {pagetitle: "Storico Prenotazioni", path: "reservations"});
    },

    renderSummary: async (req, res) =>{
        let guests = req.query.guests;
        let guests_adults = req.query.guestsadults;
        let guests_children = req.query.guestschildren;
        let guests_newborns = req.query.guestsnewborns;

        let reservation = new Reservation();

        reservation.customer = req.session.user._id;

        reservation.checkin= req.query.checkin;
        reservation.checkout= req.query.checkout;

        reservation.city_tax= req.query.citytax;
        reservation.cleaning_cost= req.query.cleaningcost;
        reservation.service_cost= req.query.servicecost;
        reservation.stay_cost = req.query.staycost;

        await Apartment.findById(req.query.apartmentid, function(err, apartment) {
            if(err) {
                console.log(`Mongo error while retrieving apartment data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else {
                reservation.apartment = apartment._id;
                reservation.host = apartment.host._id;
                res.render("index", {pagetitle: "Riepilogo prenotazione", path: "reservation-summary", 
                            apartment, reservation, guests, guests_adults, guests_children, guests_newborns});
            }

        }).populate("host");
    },

    renderCheckout: (req, res) => {
         let reservation = new Reservation();
            reservation.stay_cost = req.query.staycost;

            res.render("index", {pagetitle:"Checkout", path:"checkout",reservation});   
    },
    
    reserve: (req, res) => {

        let reservation = new Reservation(JSON.parse(req.body.reservation));
        let guests = Object.values(JSON.parse(req.body.guests));

        reservation.payment_method = req.body.payment_method;

        if(!!req.files) {

            let filesPackages = Object.values(req.files);
            let guestNumber = 0;

            for(filePackage of filesPackages) {

                let fileNamePath = `${reservation._id}_${guestNumber}_${moment().format("YYYY-MM-DD_hh-mm-ss")}`;
                guests[guestNumber].image_paths = new Array();
                let i = 0;

                if(Array.isArray(filePackage)) {

                    for(file of filePackage) {
                        let path = `/reservations/guests/images/${fileNamePath}_${i}.jpg`;
                        file.mv(`./uploads${path}`);
                        guests[guestNumber].image_paths.push(path);
                        i++;
                    }
                }
                else {
                    let file = filePackage;
                    let path = `/reservations/guests/images/${fileNamePath}.jpg`;
                    file.mv(`./uploads${path}`);
                    guests[guestNumber].image_paths.push(path);
                }

                guestNumber++;
            }
        }

        res.status(200).json({message: 'Reservation created succesfully'});

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'prova8913@gmail.com',
            pass: 'Prova123!'
            }
        });

        let mailOptions = {
            from: 'your.gmail.account@gmail.com',
            to: 'receivers.email@domain.com',
            subject: 'Test',
            text: 'Hello World!'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('success');
        });
    }
}