import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import { connectRedis } from "./config/redis.js";
import productRouter from "./routes/productRoute.js";
import router from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const app = express();

// ==================== MIDDLEWARE ====================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kitverse.vercel.app",
    ],
    credentials: true,
  })
);

// IMPORTANT: body parser MUST come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== DEBUG ====================

app.get("/debug", (req, res) => {
  res.json({
    message: "NEW SERVER CODE",
    bodyParser: "working",
    origin: req.headers.origin,
  });
});

// ==================== ROUTES ====================

app.use("/product", productRouter);
app.use("/user", router);
app.use("/order", orderRouter);

// ==================== DATABASE ====================

connectDB();
await connectRedis();

// ==================== SERVER ====================

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});