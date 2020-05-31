const mongoose = require('mongoose');

var ApartmentSchema = new mongoose.Schema({

    name: String,
    description: String,
    price : Number,
    bedrooms: Number,
    beds: Number,
    type_accomodation: String,
    services: Array,
    photo_paths: Array,

    address: {
        country: String,
        street: String,
        province: String,
        town: String,
        zipcode: String
    },
    },
    
    { timestamps: true }
);

module.exports = mongoose.model('Apartment', ApartmentSchema);