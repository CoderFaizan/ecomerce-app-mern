const express = require("express");
const {
  addCategory,
  getCategories,
} = require("../controllers/categoryController");

const app = express();

const router = express.Router();

// Route to get all data
router.post("/add", addCategory);
router.get("/get", getCategories);
module.exports = router;
