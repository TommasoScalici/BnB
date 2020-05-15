const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    firstname: String,
    lastname : String,
    age:Number,
    email : String,
    tel : Number,
    password : String

    },

    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);