module.exports = app => {
    const userController = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Go to the page for becoming a host or transform user to a user that can host.
    router.route("/becomehost")
          .get(userController.renderBecomeHost)
          .post(userController.becomeHost);

    // Logs out the current User
    router.get("/logout", userController.logout);


    // Show earnings storage
    router.get("/reservationsEarnings", userController.reservationsEarnings);


    // Show User profile
    router.get("/profile", userController.profile);

    // Show the signup form or create a new User
    router.route("/signup")
          .get(userController.renderSignup)
          .post(userController.signup);

    // Sign in the User that is trying to login if credentials are valid
    router.post("/signin", userController.signin);

    // Update data of an existing User
    router.put("/update/:id", userController.update);
  
    app.use("/users", router);
  };