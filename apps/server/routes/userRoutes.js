const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenValidation = require("../middleware/tokenValidation");

router.post("/signup", userController.createUser);

router.post("/login", userController.loginUser);

router.get("/profile", tokenValidation.validateToken, userController.getUserProfile);

router.post("/profile", tokenValidation.validateToken, userController.updateUserProfile);

router.post("/edit-profile", tokenValidation.validateToken, userController.updateUserProfile);

module.exports = router;
