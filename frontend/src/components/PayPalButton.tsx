import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface Payment {
  _id: string;
  orderID: string;
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
}

const PayPalButton: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

const API_URL = process.env.REACT_APP_API_URL;

const fetchPayments = async () => {
  const res = await fetch(`${API_URL}/api/payment/payments`);
  const data = await res.json();
  setPayments(data);
};

<PayPalButtons
  style={{ layout: "vertical" }}
  createOrder={async () => {
    const res = await fetch(
      `${API_URL}/api/payment/create-order`,
      { method: "POST" }
    );
    const data = await res.json();
    return data.id;
  }}
 onApprove={async (data) => {
  try {
    const res = await fetch(
      `${API_URL}/api/payment/capture-order/${data.orderID}`,
      { method: "POST" }
    );

    if (!res.ok) {
      throw new Error("Payment capture failed");
    }

    const result = await res.json();

    // ✅ Show Success Alert
    alert("✅ Payment Captured Successfully 🎉");

    // Refresh history
    fetchPayments();

  } catch (error) {
    alert("❌ Payment Failed. Please try again.");
    console.error(error);
  }
}}

/>


  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <PayPalButtons
        style={{ layout: "vertical" }}
       createOrder={async () => {
  const res = await fetch(
    `${API_URL}/api/payment/create-order`,
    { method: "POST" }
  );
  const data = await res.json();
  return data.id;
}}

onApprove={async (data) => {
  await fetch(
    `${API_URL}/api/payment/capture-order/${data.orderID}`,
    { method: "POST" }
  );
  fetchPayments();
}}

      />

      {/* 🔥 Payment History */}
      <div style={{ marginTop: "30px" }}>
        <h3>Payment History</h3>
        {payments.length === 0 && <p>No payments yet.</p>}

        {payments.map((payment) => (
          <div
            key={payment._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              <strong>OrderID:</strong> {payment.orderID}
            </p>
            <p>
              <strong>Amount:</strong> {payment.amount} {payment.currency}
            </p>
            <p>
              <strong>Status:</strong> {payment.status}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(payment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PayPalButton;
