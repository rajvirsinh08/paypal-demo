// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import paymentRoutes from "./routes/payment";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("🚀 PayPal Backend API is running");
// });

// app.use("/api/payment", paymentRoutes);

// // ✅ CONNECT MONGODB + START SERVER
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGODB_URI!)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//   });

// export default app;
import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 PayPal Backend API is running");
});

app.use("/api/payment", paymentRoutes);

export default app;
