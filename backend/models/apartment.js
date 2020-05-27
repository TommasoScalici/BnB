const mongoose = require('mongoose');

var ApartmentSchema = new mongoose.Schema({

    name: String,
    description: String,
    price : Number,
    beds: Number,
    rooms: Number,
    type_accomodation: String,
    services: Array,

    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String,
    },
    },
    
    { timestamps: true }
);

module.exports = mongoose.model('Apartment', ApartmentSchema);