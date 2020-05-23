const helpers = require('../config/helpers.js');
const User = require('../models/user.js');

module.exports = 
{
    signup: (req, res) => {
        var newUser = new User({

            email: req.body.email,
            password: req.body.password,
            name: {
                firstname: req.body.fname,
                lastname: req.body.lname
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

            if (!user) { // notifies if user is not found
              helpers.sendError("Nessun utente è registrato con questo indirizzo e-mail!", req, res);
            }

            else {
              user.comparePasswords(password, (err, match) => {

                if (!match) { 
                  helpers.sendError("Password non corretta!", req, res);
                }

                else {
                // Per tutta questa roba ci servirà una libreria di gestione dei cookie, per non farla a mano 

                //   var token = jwt.encode(user, 'secret');
                //   res.json({
                //     token: token, // Assegno il token di sessione client side
                //     // Restituisco anche lo userid.
                //     // Andrà conservato in un cookie in modo da poterlo riutilizzare
                //     // per future richieste al server e query al DB.
                //     userid: user['_id'],
                //     // C'è bisogno di altro?
                //   });

                res.send("Login eseguito con successo!\n" + user);
                }
              });
            }
        });
    }
}