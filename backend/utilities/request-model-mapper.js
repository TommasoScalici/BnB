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
        
        is_host: false,
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
        max_guests: req.body.maxguests,
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
        console.log(req.body.apartment);
        
        return {
            apartment: req.body.apartment._id,
            customer: req.session.user._id,
            host: req.body.apartament.host._id,
            checkin: req.body.checkin,
            checkout: req.body.checkout,
            guests: req.body.guests,
            payment_method: req.body.paymentmethod,
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
            adults: req.query.guests_adults,
            children: req.query.guests_children,
            newborns: req.query.guests_newborns,
            total: req.query.guests
        },
   }},

}