const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReservationSchema = new Schema({

    apartment:  { type: Schema.Types.ObjectId, ref: 'Apartment' },
    customer: { type: Schema.Types.ObjectId, ref: 'User' },
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    checkin: Date,
    checkout: Date,
    guests: Number,
    payment_method: String,
    city_tax: Number,
    cleaning_cost: Number,
    service_cost: Number,
    stay_cost: Number,
    },

    { timestamps: true }
);

ReservationSchema.virtual('total_cost').get(function () {
    return city_tax + cleaning_cost + service_cost + stay_cost;
});

module.exports = mongoose.model('Reservation', ReservationSchema);  