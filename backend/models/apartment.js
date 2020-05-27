const mongoose = require('mongoose');

var ApartmentSchema = new mongoose.Schema({

    name: String,

    address: {
        street: String,
        city: String,
        state: String,
        
    },

    price : Number,
    description: String,
    vote : Number,
    //votes : {type : Number, min : 0, Max : 5}
    },

    { timestamps: true }
);

module.exports = mongoose.model('Apartment', ApartmentSchema);