const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ApartmentSchema = new Schema({

    host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price : { type: Number, required: true },
    bathrooms: { type: Number, required: true, min: 1, max: 10 },
    bedrooms: { type: Number, required: true, min: 1, max: 10 },
    beds: { type: Number, required: true, min: 1, max: 20 },
    guests_max: { type: Number, required: true, min: 1, max: 20 },
    type_accomodation: { type: String, required: true },
    services: Array,
    photo_paths: Array,

    address: {
        country: { type: String, required: true },
        postal_code: { type: String, required: true },
        street: { type: String, required: true },
        street_number: { type: String, required: true },
        province: { type: String, required: true },
        town: { type: String, required: true },
    },
    },
    
    { timestamps: true }
);

ApartmentSchema.path('photo_paths').validate(function(v) {
    return v.length > 0;
});

ApartmentSchema.virtual('fulladdress').get(function () {
    return `${this.address.street} ${this.address.streetnumber}, ${this.address.postal_code} 
            ${this.address.town} ${this.address.province}, ${this.address.country}`;
});

module.exports = mongoose.model('Apartment', ApartmentSchema);