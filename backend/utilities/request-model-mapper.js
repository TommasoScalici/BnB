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
            zipcode: req.body.zipcode,
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
        description: req.body.description,
        price : req.body.price,
        beds: req.body.beds,
        rooms: req.body.rooms,
        type_accomodation: req.body.type_accomodation,
        services: req.body.services,
    
        address: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
        },   
    }},

    getReservationFromReq: (req) => {
        return{
            user: req.session.user._id,
            //apartment: req.body.apartment.id,
            checkin: req.body.checkin,
            checkout: req.body.checkout,
            guests: {
                guests: adults + children + newborn,
                adults: req.body.adults,
                children: req.body.children,
                newborns: req.body.newborn
            },
            payment: req.body.payment,
            totalPrice: req.body.totalPrice
   }},
}