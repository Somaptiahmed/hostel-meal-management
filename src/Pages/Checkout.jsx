import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Payment from './Payment';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_key)
const Checkout = () => {
  return (
    <div className="my-10">
  <h2 className="mt-20 text-4xl font-bold text-center p-4 bg-gradient-to-r from-purple-500 via-blue-500 to-blue-800 text-transparent bg-clip-text shadow-lg">
    Make Your Payment
  </h2>
  <div className='my-10'>
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  </div>
</div>

  );
};

export default Checkout;
