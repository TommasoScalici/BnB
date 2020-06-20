const fileuploader = require('../utilities/file-uploader.js');
const sendmail = require('../utilities/mail-send');

const ejs = require('ejs');
const moment = require('moment');
const path = require('path');

const Apartment = require('../models/apartment.js');
const Reservation = require('../models/reservation.js');

module.exports =
{
    renderReservations: async (req, res) => {
        if(!req.session.user)
            res.sendStatus(403);
        else {

            let futureReservations = await Reservation.find({ checkin: { $gte: moment(moment.now())}}).populate("apartment");
            let pastReservations = await Reservation.find({ checkin: { $lte: moment(moment.now())}}).populate("apartment");

            res.render("index", {pagetitle: "Viaggi", path: "reservations", futureReservations, pastReservations});
        }
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
                console.log(`Mongo error while retrieving reservation summary data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else 
                res.render("index", {pagetitle: "Riepilogo prenotazione", path: "reservation-summary", 
                            apartment, reservation, guests, guests_adults, guests_children, guests_newborns});

        }).populate("host");
    },
    
    reserve: async (req, res) => {

        let reservation;

        let draftReservation = new Reservation(JSON.parse(req.body.reservation));
        let guests = Object.values(JSON.parse(req.body.guests));
        
        let apartment = await Apartment.findById(req.body.apartmentid);

        // *** gestione business rules ***
        // Qui di seguito viene controllato che non ci siano già prenotazioni che
        // per un appartamento che possano andare in conflitto con il periodo di date scelto dal customer.
        // Inoltre viene controllato che l'ammontare complessivo dei giorni di prenotazione per l'appartamento
        // (per lo stesso customer) inclusi i giorni per cui sta effettuando la nuova prenotazione non eccedano
        // il totale di 28 giorni.

        let conflictingReservationsForApartment = await Reservation.find({
            apartment: apartment.id,
            $or: [
                { checkin: { $gt: draftReservation.checkin, $lt: draftReservation.checkout } },
                { checkout: { $gt: draftReservation.checkin, $lt: draftReservation.checkout } },
            ],
            status: { $nin: ["canceled", "refused"]}
        })

        let reservationsSameApartmentAndYearByCustomer = await Reservation.find({
                apartment: apartment.id,
                customer: req.session.user._id,
                checkin: { $gte: moment().startOf("year"), $lte: moment().endOf("year") },
                checkout: { $gte: moment().startOf("year"), $lte: moment().endOf("year") },
                status: { $nin: ["canceled", "refused"]},
        });

        let totalDays = moment(draftReservation.checkout).diff(draftReservation.checkin, "days") + 1;

        reservationsSameApartmentAndYearByCustomer.forEach(reservation => {
            totalDays += moment(reservation.checkout).diff(reservation.checkin, "days") + 1;
        });

        if(conflictingReservationsForApartment.length > 0) {
            res.status(403).json({message: "Esiste già una prenotazione per questo appartamento nel periodo selezionato"});
            return;
        }

        if(totalDays > 28) {
            res.status(403).json({message: "Non puoi prenotare uno stesso appartamento per più di 28 giorni nell'arco di un anno"});
            return;
        }

        // Fine gestione business rules

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

                guests[guestNumber].image_paths = new Array();
                let i = 0;

                if(Array.isArray(filePackage)) {

                    for(file of filePackage) {
                        let filePath = `/uploads/reservations/guests/images/${draftReservation._id}_${guestNumber}_${moment().format("YYYY-MM-DD_hh-mm-ss")}_${i}.jpg`;
                        guests[guestNumber].image_paths.push(await fileuploader(file, filePath));
                        
                        i++;
                    }
                }
                else {
                    let file = filePackage;
                    let filePath = `/uploads/reservations/guests/images/${draftReservation._id}_${guestNumber}_${moment().format("YYYY-MM-DD_hh-mm-ss")}_${i}.jpg`;
                    guests[guestNumber].image_paths.push(await fileuploader(file, filePath));
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

                ejs.renderFile(path.join(__dirname, '../../frontend/reservation-email-host.html'),
                    {
                        reservation: reservation,
                        checkin: moment(reservation.checkin).format('DD/MM/YYYY'),
                        checkout: moment(reservation.checkout).format('DD/MM/YYYY')
                    },
                    function (err, data) {
                        if (err) {
                            console.log(`Error rendering reservation result page: ${err}`);
                        }

                        sendmail(reservation.host.email, "BnB - Notifica di prenotazione ricevuta", "", data);
                    });
                
                res.status(200).json({message: 'Reservation created succesfully'});
            }
        });              
    },

    setStatus: async (req, res) => {
        if(!req.session.user || !req.session.user.is_host)
            res.sendStatus(403);
        else {
                Reservation.findByIdAndUpdate(req.params.id, { $set: { status: req.params.status } }, async function(err, reservation) {
                    if(err) {
                        console.log(`Mongo error while confirming reservation: ${err}`);
                        res.status(500).json({message: "Server error while processing the request"});
                    }
                    else {

                        await reservation.populate("apartment").populate("customer").populate("host").execPopulate();

                        ejs.renderFile(path.join(__dirname, '../../frontend/reservation-email-host.html'),
                            {
                                reservation: reservation,
                                checkin: moment(reservation.checkin).format('DD/MM/YYYY'),
                                checkout: moment(reservation.checkout).format('DD/MM/YYYY')
                            }, function (err, data) {
                                if (err) {
                                    console.log(`Error rendering reservation result page: ${err}`);
                                }

                                let emailTitle;

                                if(req.params.status == "accepted") {
                                    emailTitle = "BnB - Prenotazione confermata!"
                                    sendmail(reservation.customer.email, emailTitle, "", data,"");
                                    res.send("<h1>Prenotazione confermata! Puoi chiudere questa finestra</h1>");
                                    
                                }
                                else if(req.params.status == "canceled") {
                                    emailTitle = "BnB - Prenotazione rifiutata :(";
                                    sendmail(reservation.customer.email, emailTitle, "", data,"");
                                    res.send("<h1>Prenotazione rifiutata. Puoi chiudere questa finestra</h1>");
                                }
                                    
                                else
                                    res.send("<h1>Sei finito qui per errore.</h1>");

                                sendmail(reservation.customer.email, emailTitle, "", data,"","");
                            });
                    }
                });
        }
    },
}