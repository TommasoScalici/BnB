const mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({

    user: String,
    apartment: String,
    checkin: Date,
    checkout: Date,
    guests: {
        guests: Number,
        adults: Number,
        children: Number,
        newborns: Number
    },
    payment: String,
    totalPrice: Number
    },

    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);  