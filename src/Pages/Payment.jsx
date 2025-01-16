import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Fetch the client secret from the backend on component mount
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: 50 }), // Replace 50 with the actual price
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        setError("Failed to initialize payment.");
      }
    };
    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not initialized. Please try again.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card details are required.");
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      console.log("Payment Method:", paymentMethod);

      // Simulating a backend API call
      const paymentSuccess = true; // Replace with your actual API logic
      if (paymentSuccess) {
        setSuccess(true);
        navigate('/');
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="w-9/12 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
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
          className={`btn btn-sm btn-primary w-full ${processing ? "bg-gray-400" : ""}`}
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Payment Successful!</p>}
      </form>
    </div>
  );
};

export default Payment;


