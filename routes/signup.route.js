const express = require("express");
const router = express.Router();
const SignUp = require("../models/userDataModel");
const bcrypt = require('bcryptjs');

// Route to create a new user
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await SignUp.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
   // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new SignUp({ username, email, password });
    const savedUser = await newUser.save();

    // Respond with the newly created user
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error in /api/signup route:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
