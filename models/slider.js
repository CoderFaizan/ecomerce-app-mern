const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      //   unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Slider model
const Slider = mongoose.model("Slider", SliderSchema);

module.exports = Slider;
