        import express from "express";
        import axios from "axios";
        import { generateAccessToken } from "../paypal";

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
            }
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
            }
            );

            res.json(response.data);
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            res.status(500).json({ error: "Capture failed" });
        }
        });

        export default router;
