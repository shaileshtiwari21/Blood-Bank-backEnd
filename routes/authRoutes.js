const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// routes
// register

router.post("/register", registerController);
// login
router.post("/login", loginController);

// get current user
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
