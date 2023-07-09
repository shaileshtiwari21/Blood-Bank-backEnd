const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");
// create inventry

const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    if (inventoryType === "in" && user.role !== "donar") {
      throw new Error("Not a donnar account");
    }
    if (inventoryType === " out" && user.role !== "hospital") {
      throw new Error("Not hospital account");
    }
    // now save record
    const inventory = inventoryModel(req.body);
    await inventory.save();
    return res.status(200).json({
      success: true,
      message: "new Blood record added successfully",
      inventory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in create inventory Api",
      err,
    });
  }
};
// get inventory
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find({
      organisation: req.body.userId,
    });
    return res.status(200).json({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error in get inventory",
      err,
    });
  }
};
module.exports = { createInventoryController, getInventoryController };
