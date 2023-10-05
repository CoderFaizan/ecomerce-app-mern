const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const dbUrl = ""; // Replace with your MongoDB connection URL
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if there's an error connecting to the database
  }
};

module.exports = connectToMongoDB;
