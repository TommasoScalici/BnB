module.exports = app => {
    const userController = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Logs out the current User
    router.get("/logout", userController.logout);

    // Create a new User
    router.post("/signup", userController.signup);

    // Sign in the User that is trying to login if credentials are valid
    router.post("/signin", userController.signin);

    // Update data of an existing User
    router.put("/update/:id", userController.update);
  
    app.use('/api/users', router);
  };