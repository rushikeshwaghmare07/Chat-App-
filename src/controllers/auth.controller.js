import User from "../models/user.model.js";
import { signupSchema } from "../user.validation.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    // Validate the request body
    const parsedBody = signupSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: parsedBody.error.issues[0].message,
      });
    }

    const { fullName, email, password } = parsedBody.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create a new user
    const user = new User({
      fullName,
      email,
      password,
    });

    if (user) {
      generateToken(user._id, res);
      await user.save();

      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid user data" 
      });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
