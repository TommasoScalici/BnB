const User = require('../models/user.js');

module.exports = 
{
    getUserFromReq: (req) => {
        return new User({

        name: {
            first: req.body.firstname,
            last: req.body.lastname,
        },
    
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode
        },
    
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        
        is_host: false,
        sex: req.body.sex,
        birthdate: req.body.birthdate,
        telephone: req.body.telephone,
        });
    }
}