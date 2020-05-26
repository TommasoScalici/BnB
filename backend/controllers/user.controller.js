const User = require('../models/user.js');

module.exports = 
{
    logout: (req, res) => {
        req.session.user = null;
        res.status(200).json({message: 'Logout succesful'});
    },

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
                res.status(401).json({message: "User not found"});

            else {
                user.comparePasswords(password, (err, match) => {
                
                if (!match) 
                    res.status(401).json({message: "Password mismatch"});
                else {
                    req.session.user = user;
                    res.status(200).json({message: 'Login succesful'});
                }
              });
            }
        });
    }
}