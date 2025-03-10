import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
