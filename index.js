const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./config/db.js");
const multer = require("multer");
const bodyParser = require("body-parser");
const ProductImage = multer({ dest: "ProductsImage/" });
const CategoryImage = multer({ dest: "CategoryImage/" });
const SliderImage = multer({ dest: "SliderImage/" });
const path = require("path");
const app = express();

const port = 3010;
connectToMongoDB();
// Middleware to enable CORS
app.use(cors());
app.use(bodyParser.json());
// Middleware to parse JSON requests
app.use(express.json());
app.use("/ProductsImage", express.static("ProductsImage"));
app.use("/CategoryImage", express.static("CategoryImage"));
app.use("/SliderImage", express.static("SliderImage"));
app.use("/auth/", require("./routes/authRoutes"));
app.use(
  "/category/",
  CategoryImage.single("image"),
  require("./routes/categoryRoutes.js")
);
app.use(
  "/product/",
  ProductImage.single("image"),
  require("./routes/productRoutes.js")
);
app.use(
  "/slider/",
  SliderImage.single("image"),
  require("./routes/sliderRoutes.js")
);
app.use(express.static(path.join(__dirname, "./build/")));
app.get("*", function (req, resp) {
  resp.sendFile(path.join(__dirname, "./build/index.html"));
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
