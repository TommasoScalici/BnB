const mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({

    user: String,
    apartment: String,
    checkin: Date,
    checkout: Date,
    guests: Number,
    payment: String,
    totalPrice: Number
    },

    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);  