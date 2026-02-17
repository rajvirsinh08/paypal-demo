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
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });

/* ================================ */
app.get("/", (req, res) => {
  res.send("🚀 PayPal Backend API is running");
});

app.use("/api/payment", paymentRoutes);

export default app;
