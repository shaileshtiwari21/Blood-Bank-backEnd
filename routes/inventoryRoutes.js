const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
} = require("../controllers/investoryController");

const router = express.Router();

// routes add inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

// get inventory
router.get("/get-inventory", authMiddleware, getInventoryController);

module.exports = router;
