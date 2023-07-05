const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const createInventoryController = require("../controllers/investoryController");
const router = express.Router();

// routes add inventory
router.post("/create-inventory", authMiddleware, createInventoryController);

module.exports = router;
