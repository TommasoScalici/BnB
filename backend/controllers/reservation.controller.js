const ejs = require('ejs');
const moment = require('moment');
const path = require('path');
const sendmail = require('../utilities/mail-send');

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
            else 
                res.render("index", {pagetitle: "Riepilogo prenotazione", path: "reservation-summary", 
                            apartment, reservation, guests, guests_adults, guests_children, guests_newborns});

        }).populate("host");
    },

    renderCheckout: (req, res) => {
         let reservation = new Reservation();
            reservation.stay_cost = req.query.staycost;

            res.render("index", {pagetitle:"Checkout", path:"checkout",reservation});   
    },
    
    reserve: async (req, res) => {

        let apartment;
        let reservation;

        let draftReservation = new Reservation(JSON.parse(req.body.reservation));
        let guests = Object.values(JSON.parse(req.body.guests));
        
        await Apartment.findById(req.body.apartmentid, function(err, retrievedApartment) {
            if(err) {
                console.log(`Mongo error while retrieving apartment data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else
                apartment = retrievedApartment;
        });

        reservationform = req.body.reservationform;
        
    //-------------------------------------- MAIL------------------------------------------


        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'bnb.webandmobile@gmail.com',
            pass: 'BnB.Project123!'
            
            }
        });

        // ejs.renderFile(__dirname + "../frontend/reservation-summary.ejs", {  }, function (err, data)
        res.render('reservation-summary.ejs',function(err,data)
        {
            if (err) 
            {
                console.log(err);
            } 
            else 
            {
                 let mailOptions = {
                 from: 'bnb.webandmobile@gmail.com', 
                 to: 'apix98@hotmail.it',
                 subject: 'Test',
                 text: 'Hello!',
                 html:  data         // html body
                 };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log('success');
                });

            }

         });

        draftReservation.apartment = apartment._id;
        draftReservation.customer = req.session.user._id;
        draftReservation.host = apartment.host;

        draftReservation.guests = guests;
        draftReservation.payment_method = req.body.paymentmethod;
        draftReservation.status = "pending";

        if(!!req.files) {

            let filesPackages = Object.values(req.files);
            let guestNumber = 0;

            for(filePackage of filesPackages) {

                let fileNamePath = `${draftReservation._id}_${guestNumber}_${moment().format("YYYY-MM-DD_hh-mm-ss")}`;
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

        await Reservation.create(draftReservation, async function(err, newReservation) {
            if(err) {
                console.log(`Mongo error while creating reservation data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else {
                reservation = newReservation;
                await reservation.populate("apartment").populate("customer").populate("host").execPopulate();

                ejs.renderFile(path.join(__dirname, '../../frontend/reservation-email.html'), 
                              { reservation: reservation }, function(err, data) {
                    if(err) {
                        console.log(`Error rendering reservation result page: ${err}`);
                    }

                    sendmail("tommaso.scalici.1991@gmail.com;apix98@hotmail.it", "BnB - Prenotazione confermata!", "", data);
                });
                
                res.status(200).json({message: 'Reservation created succesfully'});
            }
        });              
    }
}