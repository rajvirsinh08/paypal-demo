import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET!;
const BASE_URL = process.env.BASE_URL!;

export const generateAccessToken = async () => {
  const auth = Buffer.from(
    PAYPAL_CLIENT_ID + ":" + PAYPAL_SECRET
  ).toString("base64");

  const response = await axios.post(
    `${BASE_URL}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};
