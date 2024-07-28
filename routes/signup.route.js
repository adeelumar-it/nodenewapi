const express = require("express");
const router = express.Router();
const SignUp = require("../models/signUpData.models");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require('bcryptjs');

// Temporary storage for OTPs (in a real app, use a database or cache)
const otpStore = {};

// Configure nodemailer
const transport = nodemailer.createTransport({
  service: "gmail", // or any other email service you use
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Generate OTP
function generateOTP() {
  return crypto.randomBytes(3).toString("hex"); // 6 characters OTP
}

// Route to create a new user and send OTP
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await SignUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate and store OTP
    const otp = generateOTP();
    otpStore[email] = otp;

    // Send OTP to user's email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Email Verification",
      text: `Do not share with anyone. Your OTP is ${otp}`,
    };

    await transport.sendMail(mailOptions);

    // Respond with a message indicating that the OTP has been sent
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Error in /api/signup route:", err);
    res.status(500).json({ error: err.message });
  }
});


// Route to verify OTP and create user
router.post("/verify-otp", async (req, res) => {
  const { otp, email, firstName, lastName, password } = req.body;

  try {
    if (otpStore[email] === otp) {
      // OTP is correct, create user
      const newUser = new SignUp({ firstName, lastName, email, password });
      const savedUser = await newUser.save();

      // Clear OTP from store after verification
      delete otpStore[email];

      res.status(201).json(savedUser);
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error in /api/signup/verify-otp route:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
