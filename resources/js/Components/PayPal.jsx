import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successful transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PayPal({ onSuccess,className }) {
  const initialOptions = {
    "client-id": "ATeuGPvcUnYEebvbZA5LDeTWvIr-bBYyB00E-4NrdspWkPzQ7048_U4MmOF2UuKJGzmPXjSqhrUoUSta", // Replace with your actual PayPal Sandbox client ID
    "enable-funding": "card",
    "disable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Initialize the PayPal script manually
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${initialOptions["client-id"]}`;
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
        },
        createOrder: (data, actions) => {
          // Manually initiate the PayPal popup
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: "10.00", // Replace with the desired amount
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          // Notify the parent component about the successful payment
          if (typeof onSuccess === 'function') {
            onSuccess();
          }

          // Notify PayPal that the transaction was successful
          return actions.order.capture();
        },
      }).render("#paypal-button-container");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onSuccess]); // Include onSuccess in the dependency array to re-run the effect when it changes

  return (
    <div className={`App `+ className}>
      <div id="paypal-button-container"></div>
      <Message content={message} />
    </div>
  );
}

export default PayPal;
