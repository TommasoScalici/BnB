const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    name: {
        firstname: String,
        lastname: String,
        // toString() { return `${firstname} ${lastname}` } // Cosa figa che devo vedere come e se si può far
    },

    address: {
        street: String,
        city: String,
        state: String,
        zip_code: String
    },

    username: String,
    email: String,
    password: String,
    
    is_host: Boolean,
    sex: String,
    birthdate: Date,
    telephone: String,
    },

    { timestamps: true }
);

UserSchema.methods.comparePasswords = function(enteredPassword, callback) {
    
    var hashedPassword = this.password;
    bcrypt.compare(enteredPassword, hashedPassword, function(err, match) {

        if(err)
            return callback(err);

        callback(null, match);
    })
};

UserSchema.pre('save', function(next) {

    var user = this;

    // Controllo che la password non sia già stata modificata, altrimenti si crea un loop.
    if (!user.isModified('password'))
        return next();

    // Genero il sale con un key stretching di fattore 10 (quindi 10 iterazioni)
    bcrypt.genSalt(10, (err, salt) => {
        
        if (err)
            return next(err);

        // Genero l'hash aggiungendo il sale alla password attuale
        bcrypt.hash(user.password, salt, (err, hash) => {

            if (err)
                return next(err);
            
            user.password = hash; // Assegno l'hash al posto della password
            next(); // Richiamo ricorsivamente la passata successiva
        });
    });
});

module.exports = mongoose.model('User', UserSchema);