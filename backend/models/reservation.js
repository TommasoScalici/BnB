const mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({

    user: String,
    apartment: String,
    reservationDate: Date,   //data di prenotazione
    checkin: Date,
    checkout: Date,
    },

    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);  