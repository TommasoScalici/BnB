const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReservationSchema = new Schema({

    apartment:  { type: Schema.Types.ObjectId, ref: 'Apartment', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    guests: Array,
    payment_method: { type: String, required: true },
    city_tax: { type: Number, required: true },
    cleaning_cost: { type: Number, required: true },
    service_cost: { type: Number, required: true },
    stay_cost: { type: Number, required: true },
    status: {
        type: String,
        enum: ["accepted", "canceled", "pending", "refused"],
        required: true,
    },
    },

    { timestamps: true }
);

// ReservationSchema.path('guests').validate(function(v) {
//     return v.length > 1
// })

ReservationSchema.virtual('total_cost').get(function () {
    return this.city_tax + this.cleaning_cost + this.service_cost + this.stay_cost;
});

module.exports = mongoose.model('Reservation', ReservationSchema);  