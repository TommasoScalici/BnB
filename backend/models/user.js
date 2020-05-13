var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: {
        first: String,
        last: String
    }
});

module.exports = mongoose.model('User', UserSchema);