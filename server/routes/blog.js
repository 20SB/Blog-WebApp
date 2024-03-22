const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (
            ext !== ".jpg" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".PNG" &&
            ext !== ".gif"
        ) {
            return cb(new Error("Only images are allowed!"));
        }

        cb(null, true);
    },
});

// Import the home controller
const blogController = require("../controllers/blog_controller");

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
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
