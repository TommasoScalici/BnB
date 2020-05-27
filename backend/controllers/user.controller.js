const Mapper = require('../utilities/request-model-mapper.js')
const User = require('../models/user.js');

module.exports = 
{
    logout: (req, res) => {
        req.session.user = null;
        res.status(200).redirect("/");
    },

    signup: async (req, res) => {

        let existingUser;
        
        await User.findOne({'email': req.body.email}, (err, user) => {

            if(err) {
                console.log(`Mongo error while user was signing up: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }

            existingUser = user;
            
        });

        if (existingUser) {
            res.status(500).json({message: "User with this e-mail address already exists!"});
            return;
        }

        var newUser = new User(Mapper.getUserFromReq(req));

        await User.create(newUser, function(err, user) {
            if(err) {
                console.log(`Mongo error while user was signing up: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else {
                req.session.user = newUser;
                res.status(200).json({message: 'Signup succesful'});
            }
        });
    },


    signin: async (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        // Utilizzo il metodo comparePasswords della classe di modello 
        // per poter confrontare la password dopo avere decrittografata 
        await User.findOne({'email': email}, (err, user) => {

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
    },

    update: async (req, res) => {

        let user = Mapper.getUserFromReq(req);

        // Questa roba in pratica mi serve per eliminare eventuali valori undefined che arrivano dal form e che andrebbero
        // a sostituire i valori già salvati nel DB.
        Object.keys(user).forEach(key => user[key] === undefined && delete user[key]);

        await User.findByIdAndUpdate(req.params.id, user, { new: true}, function(err, updatedUser) {

            if(err) {
                console.log(`Mongo error while updating user profile data: ${err}`);
                res.status(500).json({message: "Server error while processing the request"});
            }
            else {
                res.status(200).json({message: 'User profile updated succesfully'});
                req.session.user = updatedUser;
                req.session.save();
            }
        });
    }
}