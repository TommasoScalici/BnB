const mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({

    // By Tom: il modello non credo vado fatto referenziando gli id come stringhe,
    // ma credo si debbano referenziare gli Schema
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