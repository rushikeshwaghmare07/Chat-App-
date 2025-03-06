import express from "express";
import { signin, signup, logout } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", logout);

export default router;
