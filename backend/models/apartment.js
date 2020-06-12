const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ApartmentSchema = new Schema({

    host: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    price : Number,
    bathrooms: Number,
    bedrooms: Number,
    beds: Number,
    guests_max: Number,
    type_accomodation: String,
    services: Array,
    photo_paths: Array,

    address: {
        country: String,
        postal_code: String,
        street: String,
        street_number: String,
        province: String,
        town: String,
    },
    },
    
    { timestamps: true }
);

ApartmentSchema.virtual('fulladdress').get(function () {
    return `${this.address.street} ${this.address.streetnumber} ${this.address.postal_code} 
            ${this.address.town} ${this.address.province} ${this.address.country}`;
});

module.exports = mongoose.model('Apartment', ApartmentSchema);