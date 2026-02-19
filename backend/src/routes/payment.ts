import express from "express";
import axios from "axios";
import { generateAccessToken } from "../paypal";
import Payment from "../models/Payment";

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.BASE_URL}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "10.00",
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Order creation failed" });
  }
});

router.post("/capture-order/:orderID", async (req, res) => {
  try {
    const { orderID } = req.params;
    const accessToken = await generateAccessToken();

    const response = await axios.post(
      `${process.env.BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const captureData = response.data;

    // 🔥 Save into MongoDB
    const payment = await Payment.create({
      orderID: captureData.id,
      payerID: captureData.payer?.payer_id,
      amount: captureData.purchase_units[0].payments.captures[0].amount.value,
      currency:
        captureData.purchase_units[0].payments.captures[0].amount.currency_code,
      status: captureData.status,
    });

    res.json(payment);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Capture failed" });
  }
});
router.get("/payments", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error: any) {
    console.error("DB ERROR:", error);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});


export default router;
