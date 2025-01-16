
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('pk_test_51QhFLJCQ06ocEdmf3HBk37iVhQsRmPUGTHg62ITPICBbn1AMDACvDB2v3tRTvC1bOBGsx4b91DGUefcvlpzinS3K005GJTV7hR'); // Replace with your Stripe public key

const Checkout = () => {
  const { packageId } = useParams(); // Access the packageId from the URL

  
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    // Fetch package details based on the packageId
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/packages/${packageId}`);
        const data = await response.json();
        setPackageDetails(data);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      'YOUR_PAYMENT_INTENT_CLIENT_SECRET', // Replace with your server-generated client secret
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      setPaymentError(error.message);
      toast.error(`Payment failed: ${error.message}`);
    } else {
      // Successfully completed payment
      toast.success('Payment successful!');
      
      // Save payment data to the database
      try {
        const paymentData = {
          packageId,
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount_received,
          status: paymentIntent.status,
          userId: 'USER_ID', // Replace with actual user ID
        };

        await fetch('http://localhost:5000/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        // Assign a badge based on the purchased package
        await fetch('http://localhost:5000/assign-badge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'USER_ID', // Replace with actual user ID
            packageId,
          }),
        });

        // Redirect user to confirmation page or dashboard
        history.push('/purchase-confirmation');
      } catch (error) {
        console.error('Error saving payment data:', error);
        toast.error('Failed to save payment data');
      }
    }

    setLoading(false);
  };

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4 mt-10'>
      <h2>Checkout for {packageDetails.name}</h2>
      <p>Package Description: {packageDetails.description}</p>
      <p>Price: ${packageDetails.price}</p>
      <div>
      <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
      </div>

      <form onSubmit={handleSubmit}>
        <CardElement />
        {paymentError && <div style={{ color: 'red' }}>{paymentError}</div>}
        <button type="submit" disabled={loading || !stripe}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutPage;


