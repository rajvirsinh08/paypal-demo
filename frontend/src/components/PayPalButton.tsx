import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton: React.FC = () => {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={async () => {
        const res = await fetch(
          "http://localhost:5000/api/payment/create-order",
          {
            method: "POST",
          }
        );

        const data = await res.json();
        return data.id;
      }}
      onApprove={async (data) => {
        await fetch(
          `http://localhost:5000/api/payment/capture-order/${data.orderID}`,
          {
            method: "POST",
          }
        );

        alert("Payment Captured Successfully 🎉");
      }}
    />
  );
};

export default PayPalButton;
