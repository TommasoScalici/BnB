const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReservationSchema = new Schema({

    // By Tom: il modello non credo vado fatto referenziando gli id come stringhe,
    // ma credo si debbano referenziare gli Schema
    apartment:  { type: Schema.Types.ObjectId, ref: 'Apartment' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    checkin: Date,
    checkout: Date,
    guests: Number,
    payment: String,
    totalPrice: Number
    },

    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);  