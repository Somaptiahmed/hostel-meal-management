
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [price, setPrice] = useState(0); // Store price dynamically
  const [packageName, setPackageName] = useState(""); // Store package name dynamically

  const location = useLocation(); // To access the package information passed from Membership
  const stripe = useStripe();
  const elements = useElements();

  // Check if location.state exists
  useEffect(() => {
    if (location.state) {
      console.log("Location State:", location.state); // Debugging statement
      setPackageName(location.state.name);
      setPrice(location.state.price);

      // Fetch the client secret using the price passed from the Membership page
      const fetchClientSecret = async () => {
        try {
          const response = await fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: location.state.price }), // Pass the price dynamically
          });

          if (!response.ok) {
            throw new Error("Failed to fetch client secret");
          }

          const data = await response.json();
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError("Invalid response from server");
          }
        } catch (error) {
          console.error("Error fetching client secret:", error);
          setError("Failed to initialize payment.");
        }
      };

      fetchClientSecret();
    } else {
      setError("No payment package found");
    }
  }, [location.state]); // Re-run the effect if location.state changes

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError(""); // Reset the error if payment is successful
    }
  };

  return (
    <div className="w-9/12 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
      {error && <p className="text-center text-red-500">{error}</p>} {/* Show error if it exists */}
      <p className="text-center mb-4">{packageName}</p>
      <p className="text-center mb-6">${price} / month</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#a9a9a9" },
                  padding: "15px",
                  border: "2px solid #d1d1d1",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                },
                invalid: {
                  color: "#e63946",
                  iconColor: "#e63946",
                },
              },
            }}
          />
        </div>

        <button
          className="btn btn-sm btn-primary w-full"
          type="submit"
          disabled={!stripe || !clientSecret} // Disable if stripe or clientSecret is not ready
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default Payment;



