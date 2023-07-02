const { request } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const registerController = async (req, res) => {
  try {
    const preUser = await userModel.findOne({ email: req.body.email });
    if (preUser) {
      res.status(200).json({
        success: false,
        message: "This user already exist in our database",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hasPassword;

    // rest data
    const user = new userModel(req.body);
    const storeData = await user.save();
    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      storeData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in register Api",
      err,
    });
  }
};

module.exports = { registerController };
