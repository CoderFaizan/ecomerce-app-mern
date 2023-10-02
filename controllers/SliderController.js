const Slider = require("../models/slider");
const addSlider = async (req, res) => {
  try {
    // Extract Slider data from the request body
    const { name } = req.body;
    const imageUrl = req.file.path;
    // Check if name or description fields are empty
    if (!name) {
      return res.status(200).json({
        success: false,
        error: "name is required",
      });
    }

    // Check if the Slider name is already used
    const existingSlider = await Slider.findOne({ name });
    if (existingSlider) {
      return res
        .status(200)
        .json({ success: false, error: "Slider name is already in use" });
    }

    // Create a new Slider instance
    const newSlider = new Slider({ name, image: imageUrl });

    // Save the Slider to the database
    const savedSlider = await newSlider.save();

    // Send a success response with the saved Slider data
    res.status(200).json({
      success: true,
      message: "Slider Added",
      //   Slider: savedSlider,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error creating Slider:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again",
    });
  }
};

const getSliders = async (req, res) => {
  try {
    // Retrieve all categories from the database
    const Sliders = await Slider.find();

    // Send a success response with the list of categories
    res.status(200).json({
      success: true,
      Sliders,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error retrieving categories:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again",
    });
  }
};

module.exports = { addSlider, getSliders };
