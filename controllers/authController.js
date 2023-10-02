const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a controller function for user login
exports.userLogin = async (req, res) => {
  try {
    // Extract user data from the request body
    const { email, password } = req.body;

    // Check if email or password fields are empty
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res
        .status(200)
        .json({ success: false, error: "All Fields Are Required" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords match, create and send a JSON Web Token (JWT)
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        success: true,
        message: "Login Successfull",
        token,
        role: user.role,
      });
    } else {
      // If passwords don't match, return an error
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// Create a controller function to insert a new user
exports.userSignUp = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password } = req.body;

    // Check if name, email, or password fields are empty
    if (!name || !email || !password) {
      return res
        .status(200)
        .json({ success: false, error: "All Fields are required " });
    }

    // Check if the name is already used
    const existingName = await User.findOne({ name });
    if (existingName) {
      return res
        .status(200)
        .json({ success: false, error: "Name is already in use" });
    }

    // Check if the email is already used
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(200)
        .json({ success: false, error: "Email is already in use" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send a success response with the saved user data
    res.status(200).json({
      success: true,
      message: "User Created",
      user: savedUser.name,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ success: false, error: "Internal Server Error try Again" });
  }
};
