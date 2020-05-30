module.exports = app => {
      const apartmentController = require("../controllers/apartment.controller.js");

      var router = require("express").Router();

      // Get all Apartments
      router.get("/", apartmentController.getApartments);

      // Get single Aapartment
      router.get("/apartment/:id", apartmentController.getApartment);

      // Show form for inserting a new Apartment or submit a new Apartment
      router.route("/create")
            .get(apartmentController.create)
            .post(apartmentController.create);

      router.get("/search", apartmentController.searchApartments);

      router.put("/upload", apartmentController.upload);

      app.use("/apartments", router);
  };