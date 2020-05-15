const helpers = require('../config/helpers.js');
const User = require('../models/user.js');

module.exports = 
{
    create: (req, res) => {
        var newUser = new User({

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age: req.body.age,
                email : req.body.email,
                tel : req.body.telephone,
                password : req.body.password
            
        });

        User.create(newUser, function(err, user) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else
                res.send("Ti sei iscritto!");
        });
    },

    findOne: (req, res) => {
        const id = req.params.id;

        User.findById(id)
            .then(data => {
                if (!data)
                   helpers.sendNotFound(err, req, res);
                else
                    res.send(data);
            })
            .catch(err => helpers.sendError(err, req, res));
    },

    findAll: (req, res) => {
        User.find({})
            .then(data => {
                res.send(data);
            })
            .catch(err => helpers.sendError(err, req, res));
    }
}