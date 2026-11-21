import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";

import productRouter from "./routes/productRoute.js";
import router from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

// ==================== MIDDLEWARE ====================

app.use(
  cors({
    origin: ["http://localhost:5173", "https://kitverse.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== DEBUG ROUTE ====================

app.get("/debug", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KitVerse backend is running",
    bodyParser: "working",
    origin: req.headers.origin,
    database: "connected",
  });
});

// ==================== API ROUTES ====================

app.use("/product", productRouter);
app.use("/user", router);
app.use("/order", orderRouter);

// ==================== HEALTH CHECK ====================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "KitVerse API is running successfully",
  });
});

// ==================== SERVER STARTUP ====================

const startServer = async () => {
  try {
    const port = process.env.PORT || 5000;

    // Connect MongoDB first
    const isDBConnected = await connectDB();

    if (!isDBConnected) {
      console.error("Server startup stopped: MongoDB connection failed");
      process.exit(1);
    }

    // Connect Redis (optional)
    try {
      await connectRedis();
      console.log("Redis connection process completed");
    } catch (redisError) {
      console.error("Redis connection failed:", redisError.message);
      console.log("Continuing without Redis...");
    }

    // Start Express server
    app.listen(port, () => {
      console.log(`KitVerse server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
