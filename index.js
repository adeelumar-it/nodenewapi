const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON and URL-encoded data with increased limit
app.use(express.json({ limit: '50mb' })); // Increase the limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Allow CORS requests from specific origins
const allowedOrigins = {
  origin: "http://localhost:3000"
};
app.use(cors(allowedOrigins));

// Enable preflight requests for all routes
app.options('*', cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
