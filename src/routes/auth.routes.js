import express from "express";
import { signin, signup, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", logout);

router.put("/updateProfile", protectRoutes, updateProfile);

export default router;
