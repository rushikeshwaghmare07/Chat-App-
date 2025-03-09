import express from "express";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoutes, getUsersForSidebar);

export default router;
