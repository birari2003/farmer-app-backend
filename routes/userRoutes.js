const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup); // Signup
router.post("/login", userController.login);   // Login

module.exports = router;
