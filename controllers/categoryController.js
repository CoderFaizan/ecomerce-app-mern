const Category = require("../models/category");

const addCategory = async (req, res) => {
  try {
    // Extract category data from the request body
    const { name } = req.body;
    const imageUrl = req.file.path;
    // Check if name or description fields are empty
    if (!name) {
      return res.status(200).json({
        success: false,
        error: "name is required",
      });
    }

    // Check if the category name is already used
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .json({ success: false, error: "Category name is already in use" });
    }

    // Create a new category instance
    const newCategory = new Category({ name, image: imageUrl });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    // Send a success response with the saved category data
    res.status(200).json({
      success: true,
      message: "Category Added",
      //   category: savedCategory,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.find();

    // Send a success response with the list of categories
    res.status(200).json({
      success: true,
      categories,
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

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id; // Assuming you pass the category ID in the URL params

    // Check if the category with the provided ID exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    // Delete the category
    await Category.findByIdAndRemove(categoryId);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id; // Assuming you pass the category ID in the URL params
    const { name, description } = req.body;

    // Check if the category with the provided ID exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    // Update the category fields
    if (name) {
      category.name = name;
    }
    if (description) {
      category.description = description;
    }

    // Save the updated category to the database
    await category.save();

    // Send a success response with the updated category data
    res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error, please try again",
    });
  }
};
module.exports = {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategories,
};
