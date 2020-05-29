const mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({

    user: String,
    apartment: String,
    checkin: Date,
    checkout: Date,
    },

    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);  