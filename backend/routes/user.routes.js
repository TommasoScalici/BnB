module.exports = app => {
    const userController = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/signup", userController.create);
  
    // Retrieve all users
    router.get("/", userController.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", userController.findOne);
  
    // // Update a User with id
    // router.put("/:id", userController.update);
  
    // // Delete a User with id
    // router.delete("/:id", userController.delete);
  
    app.use('/api/users', router);
  };