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

ApartmentSchema.virtual('fulladdress').get(function () {
    return `${this.address.street} ${this.address.zipcode} ${this.address.town} ${this.address.province}`;
});

module.exports = mongoose.model('Apartment', ApartmentSchema);