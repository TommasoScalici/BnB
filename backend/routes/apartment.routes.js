module.exports = app => {
    const apartmentController = require("../controllers/apartments.controller.js");
  
    var router = require("express").Router();
  
    router.post("/insert", apartmentController.insert);

  
    router.post("/:id", apartmentController.delete);
  
    app.use('/api/apartments', router);
  };