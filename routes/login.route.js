const express = require("express");
const router = express.Router();
const SignUp = require("../models/userDataModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Route to login user
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Email received:", email); // Log the email received
    const existingUser = await SignUp.findOne({ email });
    console.log("Existing user:", existingUser); // Log the result of the query

    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

   //  const isPasswordMatch =  bcrypt.compare(password, existingUser.password);
    if (password==existingUser.password) {
      
    }else{
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error in /api/login route:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
