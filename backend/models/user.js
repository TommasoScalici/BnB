var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    firstname: String,
    lastname : String,
    age:Number,
    email : String,
    tel : Number,
    password : String

});

module.exports = mongoose.model('User', UserSchema);