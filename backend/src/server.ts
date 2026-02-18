import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import paymentRoutes from "./routes/payment";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================================
   ✅ MongoDB Direct Connection
================================= */

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

/* ================================ */
app.get("/", (req, res) => {
  res.send("🚀 PayPal Backend API is running");
});

app.use("/api/payment", paymentRoutes);

export default app;
