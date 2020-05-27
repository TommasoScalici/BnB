module.exports = app => {
    const apartmentController = require("../controllers/apartment.controller.js");
  
    var router = require("express").Router();
  
    //router.get("/apartments", apartmentController.getApartments);
    router.get("/apartment/:id", apartmentController.getApartment);

    router.post("/create", apartmentController.create);
    router.post("/delete", apartmentController.delete);
    router.post("/update/:id", apartmentController.update);

    app.use('/api/apartments', router);
  };