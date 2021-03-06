module.exports = 
{ 
    getUserFromReq: (req) => {
        return {

        name: {
            first: req.body.firstname,
            last: req.body.lastname,
        },
    
        address: {
            country: req.body.country,
            postal_code: req.body.postalcode,
            street: req.body.street,
            street_number: req.body.streetnumber,
            province: req.body.province,
            town: req.body.town,
        },   
    
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        
        sex: req.body.sex,
        birthdate: req.body.birthdate,
        telephone: req.body.telephone,
    }},

    getApartmentFromReq: (req) => {
        return {

        host: req.session.user._id,
        name: req.body.name,
        description: req.body.description,
        price : req.body.price,
        bathrooms: req.body.bathrooms,
        beds: req.body.beds,
        bedrooms: req.body.bedrooms,
        guests_max: req.body.guestsmax,
        type_accomodation: req.body.typeaccomodation,
        services: req.body.services,
        photo_paths: new Array(),
    
        address: {
            country: req.body.country,
            postal_code: req.body.postalcode,
            street: req.body.street,
            street_number: req.body.streetnumber,
            province: req.body.province,
            town: req.body.town,
        },  
    }},

    getReservationFromReq: (req) => {
        return  {

        apartment: req.body.apartment._id,
        customer: req.session.user._id,
        host: req.body.apartament.host._id,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        payment_method: req.body.paymentmethod,
        payment_citytax: req.body.paymentcitytax,
        city_tax: req.body.citytax,
        cleaning_cost: req.body.cleaningcost,
        service_cost: req.body.servicecost,
        stay_cost: req.body.staycost,
    }},

    getSearchDataFromReq: (req) => {
       return {

       checkin: req.query.checkin,
       checkout: req.query.checkout,

       location: {
           country: req.query.country,
           postal_code: req.query.postalcode,
           street: req.query.street,
           street_number: req.query.streetnumber,
           province: req.query.province,
           town: req.query.town,
        },

        guests: {
           adults: req.query.guestsadults,
           children: req.query.guestschildren,
           newborns: req.query.guestsnewborns,
           total: req.query.guests
        },
    }},
}