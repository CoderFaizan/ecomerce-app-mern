const mongoose = require("mongoose");
const Product = require("../models/products");

const addProduct = async (req, res) => {
  try {
    // Extract product data from the request body
    const { name, description, price, image, quantity, category, actualPrice } =
      req.body;
    const imageUrl = req.file.path;

    // Create a new product document if (!mongoose.Types.ObjectId.isValid(category)) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid category ObjectId" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image: imageUrl,
      quantity,
      category,
      actualPrice,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
};
const getProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const allProducts = await Product.find();

    // Shuffle the products array to make them random
    const shuffledProducts = shuffleArray(allProducts);

    // Send the shuffled products as a JSON response
    res.status(200).json({
      success: true,
      products: shuffledProducts,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

// Function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(200)
        .json({ success: false, error: "Invalid product ObjectId" });
    }

    // Find the product by its ID in the database
    const product = await Product.findById(productId);

    // If the product is not found, return a 404 error
    if (!product) {
      return res
        .status(200)
        .json({ success: false, error: "Product not found" });
    }

    // If the product is found, return its details
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({ success: false, error: "Error fetching product" });
  }
};

const getSimilarProduct = async (req, res) => {
  try {
    const { pId, cId } = req.params; // Assuming the category ID is passed as a route parameter

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cId)) {
      return res
        .status(200)
        .json({ success: false, error: "Invalid category ObjectId" });
    }

    // Find products with the specified category ID in the database, excluding one product and limiting to four results
    const products = await Product.find({
      category: cId,
      _id: { $ne: pId }, // Exclude one product with the specified ID
    }).limit(4); // Limit the number of results to four

    // If no products are found for the specified category, return an empty array
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for this category",
        products: [],
      });
    }

    // If products are found, return the list of products
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({ success: false, error: "Error fetching products by category" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; // Assuming the category ID is passed as a route parameter

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res
        .status(200)
        .json({ success: false, error: "Invalid category ObjectId" });
    }

    // Find products with the specified category ID in the database
    const products = await Product.find({ category: categoryId });

    // If no products are found for the specified category, return an empty array
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for this category",
        products: [],
      });
    }

    // If products are found, return the list of products
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res
      .status(200)
      .json({ success: false, error: "Error fetching products by category" });
  }
};
module.exports = {
  addProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  getSimilarProduct,
};
