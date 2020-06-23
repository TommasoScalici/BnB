module.exports = app => {
      const apartmentController = require("../controllers/apartment.controller.js");

      var router = require("express").Router();

      // Show the page for the selected Apartment
      router.get("/apartment/:id", apartmentController.renderApartment);

      // Show form for inserting a new Apartment or submit a new Apartment
      router.route("/create")
            .get(apartmentController.renderInsertApartment)
            .post(apartmentController.create);

      router.get("/search", apartmentController.searchApartments);

      app.use("/apartments", router);
};