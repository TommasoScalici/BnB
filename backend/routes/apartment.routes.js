module.exports = app => {
    const apartmentController = require("../controllers/apartments.controller.js");
  
    var router = require("express").Router();
  
    router.post("/insert", apartmentController.insert);


    router.post("/update:id", apartmentController.update);

    router.get("/apartments:id", apartmentController.apartments);

  
    router.post("/delete", apartmentController.delete);
  
    app.use('/api/apartments', router);
  };