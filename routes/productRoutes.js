const express = require("express");
const { isLogedIn } = require("../middlewares/authMiddleware");
const {
  addProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  getSimilarProduct,
} = require("../controllers/productsController");

const app = express();

const router = express.Router();

// Route to get all data
router.post("/add", addProduct);
router.get("/get", getProducts);
router.get("/singleProduct/:id", getProductById);
router.get("/Category/:categoryId", getProductsByCategory);
router.get("/similarProducts/:pId/:cId", getSimilarProduct);
module.exports = router;
