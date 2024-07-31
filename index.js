const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

// Allow all CORS requests
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Import routes
const signupRoute = require("./routes/signup.route");
app.use("/api/signup", signupRoute);

const signinRoute = require("./routes/login.route");
app.use("/api/login", signinRoute);

const blogpostRoute = require("./routes/blogpost.route");
app.use("/api/blogpost", blogpostRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
