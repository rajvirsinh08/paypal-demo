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

mongoose
  .connect("mongodb://127.0.0.1:27017/paypalDemo")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
  });

/* ================================ */

app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
