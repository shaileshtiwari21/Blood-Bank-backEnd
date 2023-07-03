const { request } = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
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
      message: "User registered successfully",
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
// login

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status.json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // compare password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(500).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // token genrate
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",

      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in Login Api",
      err,
    });
  }
};
module.exports = { registerController, loginController };
