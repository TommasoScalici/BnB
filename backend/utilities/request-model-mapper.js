const mongoose = require('mongoose');
const Apartment = require('../models/apartment.js');
const Reservation = require('../models/reservation.js');


module.exports = 
{
    getUserFromReq: (req) => {
        return {

        name: {
            first: req.body.firstname,
            last: req.body.lastname,
        },
    
        address: {
            country: req.body.country,
            postal_code: req.body.postalcode,
            street: req.body.street,
            street_number: req.body.streetnumber,
            province: req.body.province,
            town: req.body.town,
        },   
    
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        
        sex: req.body.sex,
        birthdate: req.body.birthdate,
        telephone: req.body.telephone,
    }},

    getApartmentFromReq: (req) => {
        return {

        host: req.session.user._id,
        name: req.body.name,
        description: req.body.description,
        price : req.body.price,
        bathrooms: req.body.bathrooms,
        beds: req.body.beds,
        bedrooms: req.body.bedrooms,
        guests_max: req.body.guestsmax,
        type_accomodation: req.body.typeaccomodation,
        services: req.body.services,
        photo_paths: new Array(),
    
        address: {
            country: req.body.country,
            postal_code: req.body.postalcode,
            street: req.body.street,
            street_number: req.body.streetnumber,
            province: req.body.province,
            town: req.body.town,
        },  
    }},

    getReservationFromReq: (req) => {
  
        return  {
            apartment: req.body.apartment._id,
            customer: req.session.user._id,
            host: req.body.apartament.host._id,
            checkin: req.body.checkin,
            checkout: req.body.checkout,
            payment_method: req.body.paymentmethod,
            city_tax: req.body.citytax,
            cleaning_cost: req.body.cleaningcost,
            service_cost: req.body.servicecost,
            stay_cost: req.body.staycost,
   }},

   getSummaryFromReq: async (req) => {
  
    Apartment.findById(req.query.apartmentid, function(err, apartment) {
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


    return {
        apartment: req.query.apartmentid,
         guests : req.query.guests,
         guests_adults : req.query.guestsadults,
         guests_children : req.query.guestschildren,
         guests_newborns : req.query.guestsnewborns,

        reservationcustomer : req.session.user._id,

        reservationcheckin: req.query.checkin,
        reservationcheckout: req.query.checkout,

        reservationcity_tax: req.query.citytax,
        reservationcleaning_cost: req.query.cleaningcost,
        reservationservice_cost: req.query.servicecost,
        reservationstay_cost : req.query.staycost,
        
}},

   getSearchDataFromReq: (req) => {
    return {

        checkin: req.query.checkin,
        checkout: req.query.checkout,
        location: {
            country: req.query.country,
            postal_code: req.query.postalcode,
            street: req.query.street,
            street_number: req.query.streetnumber,
            province: req.query.province,
            town: req.query.town,
        },
        guests: {
            adults: req.query.guestsadults,
            children: req.query.guestschildren,
            newborns: req.query.guestsnewborns,
            total: req.query.guests
        },
   }},

}