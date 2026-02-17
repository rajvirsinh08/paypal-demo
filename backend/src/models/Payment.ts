import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderID: { type: String, required: true },
    payerID: { type: String },
    amount: { type: String, required: true },
    currency: { type: String, required: true },
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
