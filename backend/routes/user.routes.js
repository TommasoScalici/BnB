module.exports = app => {
    const userController = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Logs out the current user
    router.get("/logout", userController.logout);

    // Create a new User
    router.post("/signup", userController.signup);

    // Sign in the user that is trying to login if credentials are valid
    router.post("/signin", userController.signin);

     // Update data of an existing user
     router.post("/update:id", userController.update);
  
    // Retrieve all users
    // router.get("/", userController.findAll);
  
    // Retrieve a single User with id
    // router.get("/:id", userController.findOne);
  
    // // Update a User with id
    // router.put("/:id", userController.update);
  
    // // Delete a User with id
    // router.delete("/:id", userController.delete);
  
    app.use('/api/users', router);
  };