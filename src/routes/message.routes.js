import express from "express";
import { protectRoutes } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoutes, getUsersForSidebar);
router.get("/:id", protectRoutes, getMessages);

export default router;
