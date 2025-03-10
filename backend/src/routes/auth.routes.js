import express from "express";
import { signin, signup, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", logout);

router.put("/update-profile", protectRoutes, updateProfile);

router.get("/check-auth", protectRoutes, checkAuth);

export default router;
