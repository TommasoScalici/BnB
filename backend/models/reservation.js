const mongoose = require('mongoose');
const User = require('./user');
const Apartment = require('./apartment');
const Schema = mongoose.Schema;

var ReservationSchema = new mongoose.Schema({

    // By Tom: il modello non credo vado fatto referenziando gli id come stringhe,
    // ma credo si debbano referenziare gli Schema
    user: {type: Schema.Types.ObjectId, ref: "User"},
    apartment: { type: Schema.Types.ObjectId, ref: 'Apartment' },
    checkin: Date,
    checkout: Date,
    guests: Number,
    payment: String,
    totalPrice: Number
    },

    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);  