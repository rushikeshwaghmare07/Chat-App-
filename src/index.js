import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./db/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
