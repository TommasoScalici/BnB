module.exports = app => {
    const apartmentController = require("../controllers/apartment.controller.js");
  
    var router = require("express").Router();

    // Get all Apartments
    router.get("/", apartmentController.getApartments);

    // Get single Aapartment
    router.get("/:id", apartmentController.getApartment);

    // Create a new Apartment
    router.post("/create", apartmentController.create);

    app.use('/api/apartments', router);
  };