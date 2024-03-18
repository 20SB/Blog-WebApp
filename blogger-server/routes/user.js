const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import the home controller
const userController = require("../controllers/user_controller");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.put(
    "/",
    passport.authenticate("jwt", { session: false }),
    userController.updateProfile
);
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    userController.getUser
);

// Export the main router to be used in your application
module.exports = router;
