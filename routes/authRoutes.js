const express = require("express");
const router = express.Router();
const { registerController } = require("../controllers/authController");

// routes
router.post("/register", registerController);

module.exports = router;
