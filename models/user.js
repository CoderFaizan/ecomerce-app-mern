const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
      //   unique: true,
    },
    email: {
      type: String,
      //   required: true,
      //   unique: true,
    },
    password: {
      type: String,
      //   required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
