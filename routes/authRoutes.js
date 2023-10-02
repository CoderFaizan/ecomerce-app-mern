const express = require("express");
const { userSignUp, userLogin } = require("../controllers/authController");
const { isLogedIn } = require("../middlewares/authMiddleware");

const app = express();

const router = express.Router();

// Route to get all data
router.post("/userSignUp", userSignUp);
router.post("/userLogin", userLogin);
router.get("/checkUser", isLogedIn, (req, resp) => {
  resp.status(200).json({ success: true });
});
module.exports = router;
