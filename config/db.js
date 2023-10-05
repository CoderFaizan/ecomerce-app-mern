const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const dbUrl = "mongodb+srv://faizanrauf797979:8SN6PHh1w4czSWOk@cluster0.ljedzmb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"; // Replace with your MongoDB connection URL
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
