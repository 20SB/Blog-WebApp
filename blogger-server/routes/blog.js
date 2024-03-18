const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import the home controller
const blogController = require("../controllers/blog_controller");

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    blogController.addBlog
);
router.put(
    "/",
    passport.authenticate("jwt", { session: false }),
    blogController.editBlog
);
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    blogController.getBlog
);
router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    blogController.deleteBlog
);

router.get(
    "/all",
    passport.authenticate("jwt", { session: false }),
    blogController.getAllBlogs
);

// Export the main router to be used in your application
module.exports = router;
