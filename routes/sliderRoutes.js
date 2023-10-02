const express = require("express");
const { addSlider, getSliders } = require("../controllers/SliderController");

const app = express();

const router = express.Router();

// Route to get all data

router.post("/add", addSlider);
router.get("/get", getSliders);
module.exports = router;
