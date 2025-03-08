import User from "../models/user.model.js";
import { signupSchema } from "../validations/user.validation.js";
import { generateToken } from "../utils/jwt.js";
import cloudinary from "../utils/cloudinary.js";

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
        message: "Invalid user data",
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

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in signin controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({
        success: false,
        message: "Profile pic is required.",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updateUser,
    });
  } catch (error) {
    console.log("Error in updateProfile controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "User is authenticated",
      user,
    });
  } catch (error) {
    console.log("Error in checkAuth controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}