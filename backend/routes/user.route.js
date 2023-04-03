"use strict";
const router = require("express").Router();
const user = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const imageUpload = require("../middleware/imageUpload");

router.get("/get-user", user.get_user);
router.post("/login", user.loginUser);
router.post("/sign-up", imageUpload, user.registerUser);
router.get("/verify-email/:id", user.verifyEmail);
router.post("/upload-image", imageUpload, user.uploadImage);
router.post("/forgot-password", auth, user.forgetPassword);
router.delete("/delete-ac/:id", auth, user.deleteAccount);

module.exports = router;