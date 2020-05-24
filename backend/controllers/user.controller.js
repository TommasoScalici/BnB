const helpers = require('../config/helpers.js');
const User = require('../models/user.js');

module.exports = 
{
    signup: (req, res) => {
        var newUser = new User({

            email: req.body.email,
            password: req.body.password,
            name: {
                first: req.body.fname,
                last: req.body.lname
            },
            
            birthdate: req.body.birthdate,
            sex: req.body.sex,
            telephone: req.body.telephone
        });

        User.create(newUser, function(err, user) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else
                res.send("Ti sei iscritto!");
        });
    },


    signin: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
    
        // Utilizzo il metodo comparePasswords della classe di modello 
        // per poter confrontare la password dopo avere decrittografata 
        User.findOne({'email': email}, (err, user) => {

            if (!user) // notifies if user is not found
              helpers.sendError("Nessun utente è registrato con questo indirizzo e-mail!", req, res);

            else {
              user.comparePasswords(password, (err, match) => {

                if (!match) 
                  helpers.sendError("Password non corretta!", req, res);
                else
                  res.render('signin', {user: user});
              });
            }
        });
    }
}