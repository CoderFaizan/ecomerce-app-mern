const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: {
      type: String,
      required: true,
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

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
