  import React from "react";
  import { PayPalScriptProvider } from "@paypal/react-paypal-js";
  import PayPalButton from "./components/PayPalButton";

  function App() {
    return (
    <PayPalScriptProvider
    options={{
      clientId:
        "AauEc9YSgJMQiShlP-yRfIw3PLrhbvFVjsl8ZhWZ0TYR22ScbZMsgYI_VBfndrg_o1u_judluRPROXIc",
      currency: "USD",
      intent: "capture",
      components: "buttons",
    }}
  >

        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>PayPal Demo</h2>
          <PayPalButton />
        </div>
      </PayPalScriptProvider>
    );
  }

  export default App;