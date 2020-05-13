var User = require('../models/user.js');

module.exports = {
    
    signup: (req, res) => {

        var newUser = new User({
            name: {
                first: req.body.firstname,
                last: req.body.lastname
            }
        });

        User.create(newUser, function(err, user) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else
                res.send("Signed up succesfully!");
        })
    }
}