// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
exports.isLogedIn = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log("Unauthorized");
    return res.status(200).json({ success: false, error: "Unauthorized" });
  }
  // console.log("token");
  // console.log(token);
  try {
    const decode = jwt.verify(token, "your-secret-key");
    console.log("done");
    next();
  } catch (error) {
    console.log(error);
  }
};
