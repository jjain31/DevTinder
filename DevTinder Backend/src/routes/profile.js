const express = require("express");
const userAuth = require("../middleware/auth");
const {
  validatetheProfileData
} = require("../utils/validation")
require('dotenv').config();

const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const validator = require("validator");
const OTP_EXPIRATION_TIME = 10 * 60 * 1000;
const User = require("../models/User");


const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
   
  }
});
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const validation = validatetheProfileData(req);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    const LoggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      LoggedInUser[key] = req.body[key];
    });

    await LoggedInUser.save();
    res.json({
      message: `${LoggedInUser.firstName}, your profile updated successfully`,
      data: LoggedInUser
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.post("/profile/password/reset", async (req, res) => {
  try {
    const {
      emailId
    } = req.body;
    const user = await User.findOne({
      emailId
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Generate OTP and expiration time
    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    const otpExpiresAt = Date.now() + OTP_EXPIRATION_TIME;

    // Store OTP and expiration in user record
    user.resetOtp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: emailId,
      subject: "Your Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. It expires in 10 minutes.`
    });

    res.send("OTP sent to email");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Verify OTP and reset password
profileRouter.patch("/profile/password/reset", async (req, res) => {
  try {
    const {
      emailId,
      otp,
      password
    } = req.body;
    const user = await User.findOne({
      emailId
    });

    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user.resetOtp);
    // Check if OTP is valid and not expired
    if (user.resetOtp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).send("Invalid or expired OTP");
    }

    // Validate new password strength
    if (!validator.isStrongPassword(password)) {
      return res.status(400).send("Password must be stronger");
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Clear OTP fields
    user.resetOtp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    res.send("Password updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = profileRouter;