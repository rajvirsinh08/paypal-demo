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

  const fetchPayments = async () => {
    const res = await fetch(
      "http://localhost:5000/api/payment/payments"
    );
    const data = await res.json();
    setPayments(data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async () => {
          const res = await fetch(
            "http://localhost:5000/api/payment/create-order",
            { method: "POST" }
          );
          const data = await res.json();
          return data.id;
        }}
        onApprove={async (data) => {
          await fetch(
            `http://localhost:5000/api/payment/capture-order/${data.orderID}`,
            { method: "POST" }
          );

          alert("Payment Captured Successfully 🎉");
          fetchPayments(); // 🔥 refresh list
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
            <p><strong>OrderID:</strong> {payment.orderID}</p>
            <p><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
            <p><strong>Status:</strong> {payment.status}</p>
            <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PayPalButton;
