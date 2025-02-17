const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("SignUp", signUpSchema);
