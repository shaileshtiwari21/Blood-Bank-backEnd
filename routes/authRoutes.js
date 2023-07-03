const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/authController");

// routes
// register

router.post("/register", registerController);
// login
router.post("/login", loginController);

module.exports = router;
