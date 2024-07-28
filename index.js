const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

//allow cors///

app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Import routes
const signupRoute = require("./routes/signup.route");

// Use routes
app.use("/api/signup", signupRoute);

const signinRoute = require("./routes/login.route");

// Use routes
app.use("/api/login", signinRoute);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
