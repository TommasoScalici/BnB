module.exports = 
{
    getUserFromReq: (req) => {
        return {

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
    }},

    getApartmentFromReq: (req) => {
        return {

            name: req.body.name,

            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                
            },
        
            price : req.body.price,
            description: req.body.description,
            vote : req.body.vote,       
    }
}}