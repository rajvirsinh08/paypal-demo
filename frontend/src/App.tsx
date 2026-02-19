  import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CountUp from "react-countup";
import Swal from "sweetalert2";

interface Payment {
  _id: string;
  orderID: string;
  payerID?: string;
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
}

function App() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [show, setShow] = useState(false);
const API_URL = process.env.REACT_APP_API_URL!;

 const fetchPayments = async () => {
  try {
    const res = await fetch(`${API_URL}/api/payment/payments`);
    const data = await res.json();

    if (Array.isArray(data)) {
      setPayments(data.reverse());
    } else {
      console.error("Unexpected response:", data);
      setPayments([]);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    setPayments([]);
  }
};


  useEffect(() => {
    fetchPayments();
    setTimeout(() => setShow(true), 200);
  }, []);

  const totalRevenue = payments
    .filter((p) => p.status === "COMPLETED")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <PayPalScriptProvider
      options={{
        // clientId:
        //   "AauEc9YSgJMQiShlP-yRfIw3PLrhbvFVjsl8ZhWZ0TYR22ScbZMsgYI_VBfndrg_o1u_judluRPROXIc",
        clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID!,

        currency: "USD",
        intent: "capture",
      }}
    >
      <div style={styles.page}>
        <div
          style={{
            ...styles.container,
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(40px)",
          }}
        >
          {/* NAVBAR */}
          <nav style={styles.nav}>
            <h2 style={styles.logo}>PayFlow Pro</h2>
            <div style={styles.navRight}>
              <span style={styles.badge}>Live</span>
              <div style={styles.avatar}>RD</div>
            </div>
          </nav>

          {/* HERO */}
          <section style={styles.hero}>
            <h1 style={styles.title}>Enterprise Payment Infrastructure</h1>
            <p style={styles.subtitle}>
              Secure PayPal order creation, capture & transaction tracking.
              Real-time analytics powered by React + TypeScript + Node.js.
            </p>

            <div style={styles.stats}>
              <div style={styles.statCard}>
                <span>Total Revenue</span>
                <strong style={styles.statNumber}>
                  $
                  <CountUp end={totalRevenue} decimals={2} duration={2} />
                </strong>
              </div>

              <div style={styles.statCard}>
                <span>Total Transactions</span>
                <strong style={styles.statNumber}>{payments.length}</strong>
              </div>
            </div>
          </section>

          {/* MAIN GRID */}
          <section style={styles.grid}>
            {/* PAYMENT CARD */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Secure Live Payment</h3>
              <p style={styles.cardText}>
                Experience enterprise-grade PayPal checkout integration with
                backend verification and secure capture flow.
              </p>

              <div style={{ marginTop: 30 }}>
                {/* 🧪 Sandbox Credentials Card */}
<div style={styles.sandboxCard}>
  <h4 style={styles.sandboxTitle}>Sandbox Test Account</h4>

  <div style={styles.credentialRow}>
    <span style={styles.credentialLabel}>Email</span>
    <span style={styles.credentialValue}>
      sb-u3m9y49435222@personal.example.com
    </span>
  </div>

  <div style={styles.credentialRow}>
    <span style={styles.credentialLabel}>Password</span>
    <span style={styles.credentialValue}>
      eY&.!2lV
    </span>
  </div>

  <p style={styles.sandboxNote}>
    Use these credentials in the PayPal popup to test payments in sandbox mode.
  </p>
</div>

             <PayPalButtons
  style={{ layout: "vertical" }}
  createOrder={async () => {
    const res = await fetch(
      `${API_URL}/api/payment/create-order`,
      { method: "POST" }
    );

    if (!res.ok) {
      throw new Error("Failed to create order");
    }

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

await res.json();

    // 🔥 Professional Enterprise Success Modal
    await Swal.fire({
      title: "Payment Completed",
      html: `
        <div style="text-align:left">
          <p><strong>Order ID:</strong> ${data.orderID}</p>
          <p><strong>Status:</strong> COMPLETED</p>
          <p>Your transaction has been securely processed.</p>
        </div>
      `,
      icon: "success",
      confirmButtonText: "Continue",
      confirmButtonColor: "#6366f1",
      background: "#1e293b",
      color: "#ffffff",
      iconColor: "#22c55e",
    });

    fetchPayments();

  } catch (error) {
    Swal.fire({
      title: "Payment Failed",
      text: "Something went wrong while processing your payment.",
      icon: "error",
      confirmButtonColor: "#ef4444",
      background: "#1e293b",
      color: "#ffffff",
    });
  }
}}

/>

              </div>
            </div>

            {/* PREMIUM TRANSACTIONS */}
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Transaction History</h3>

              {payments.length === 0 ? (
                <p style={{ color: "#94a3b8" }}>No transactions yet.</p>
              ) : (
                payments.map((payment) => (
                  <div key={payment._id} style={styles.transactionCard}>
                    <div style={styles.transactionHeader}>
                      <div>
                        <h4 style={styles.amount}>
                          ${payment.amount} {payment.currency}
                        </h4>
                        <p style={styles.date}>
                          {new Date(payment.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <span
                        style={{
                          ...styles.status,
                          background:
                            payment.status === "COMPLETED"
                              ? "rgba(34,197,94,0.15)"
                              : "rgba(239,68,68,0.15)",
                          color:
                            payment.status === "COMPLETED"
                              ? "#22c55e"
                              : "#ef4444",
                        }}
                      >
                        {payment.status}
                      </span>
                    </div>

                    <div style={styles.transactionDetails}>
                      <div>
                        <span style={styles.label}>Order ID</span>
                        <p style={styles.value}>{payment.orderID}</p>
                      </div>

                      <div>
                        <span style={styles.label}>Payer ID</span>
                        <p style={styles.value}>
                          {payment.payerID || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <footer style={styles.footer}>
            © 2026 Rajvirsinh Dabhi • Full Stack Developer
          </footer>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

const styles: any = {
  sandboxCard: {
  marginTop: "25px",
  padding: "20px",
  borderRadius: "18px",
  background: "rgba(99,102,241,0.08)",
  border: "1px solid rgba(99,102,241,0.3)",
  backdropFilter: "blur(12px)",
},

sandboxTitle: {
  color: "#6366f1",
  marginBottom: "15px",
  fontSize: "16px",
  fontWeight: 600,
},

credentialRow: {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
},

credentialLabel: {
  color: "#94a3b8",
  fontSize: "13px",
},

credentialValue: {
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 600,
  background: "rgba(255,255,255,0.08)",
  padding: "4px 8px",
  borderRadius: "6px",
},

sandboxNote: {
  marginTop: "12px",
  fontSize: "12px",
  color: "#94a3b8",
  lineHeight: 1.5,
},

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a 0%,#111827 40%,#1e293b 100%)",
    padding: "40px 20px",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    justifyContent: "center",
  },

  container: {
    width: "100%",
    maxWidth: "1300px",
    transition: "all 0.6s ease",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "60px",
  },

  logo: {
    color: "#fff",
    fontWeight: 700,
    fontSize: "22px",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  badge: {
    background: "linear-gradient(90deg,#22d3ee,#6366f1)",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#fff",
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#1e293b",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
  },

  hero: {
    textAlign: "center",
    marginBottom: "80px",
  },

  title: {
    fontSize: "clamp(32px,5vw,56px)",
    fontWeight: 800,
    background: "linear-gradient(90deg,#22d3ee,#6366f1,#ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#cbd5e1",
    maxWidth: "750px",
    margin: "0 auto",
    lineHeight: 1.7,
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "50px",
    flexWrap: "wrap",
  },

  statCard: {
    backdropFilter: "blur(16px)",
    background: "rgba(255,255,255,0.05)",
    padding: "30px 50px",
    borderRadius: "20px",
    color: "#fff",
    minWidth: "240px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    textAlign: "center",
  },

  statNumber: {
    fontSize: "26px",
    fontWeight: 700,
    marginTop: "10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
    gap: "40px",
  },

  card: {
    backdropFilter: "blur(18px)",
    background: "rgba(255,255,255,0.04)",
    padding: "45px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 25px 70px rgba(0,0,0,0.6)",
  },

  cardTitle: {
    color: "#ffffff",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: 600,
  },

  cardText: {
    color: "#cbd5e1",
    lineHeight: 1.7,
    fontSize: "15px",
  },

  transactionCard: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  transactionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amount: {
    color: "#fff",
    margin: 0,
  },

  date: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "4px",
  },

  transactionDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
    flexWrap: "wrap",
    gap: "20px",
  },

  label: {
    fontSize: "11px",
    color: "#64748b",
  },

  value: {
    fontSize: "13px",
    color: "#fff",
    marginTop: "3px",
  },

  status: {
    padding: "8px 18px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: 600,
  },

  footer: {
    textAlign: "center",
    marginTop: "90px",
    color: "#64748b",
    fontSize: "14px",
  },
};

export default App;
