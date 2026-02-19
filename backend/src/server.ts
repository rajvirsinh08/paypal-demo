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
