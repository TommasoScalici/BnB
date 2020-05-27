const mongoose = require('mongoose');

var ReservationSchema = new mongoose.Schema({

    user: mongoose.Types.ObjectId,
    apartment: mongoose.Types.ObjectId,
    reservationdate: Date,   //data di prenotazione
    startVacation: Date,
    endVacation: Date,
    },

    { timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema);  