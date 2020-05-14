var User = require('../models/user.js');

module.exports = 
{
    
    signup: (req, res) =>   //scenderà togliendo la funzione in fondo
    {

        var newUser = new User({

                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email : req.body.email,
                tel : req.body.tel,
                password : req.body.password
            
        });

        User.create(newUser, function(err, user) {
            if(err)
                console.log(`Mongo error while user was signing up: ${err}`);
            else
                res.send("Signed up succesfully!");
        });


        User.find(function (err, newUser) {   //per vedere cosa mi ha appena inserito
            if (err) return console.error(err);
            console.log(newUser)});
           
    }
        
   
}

