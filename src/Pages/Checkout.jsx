// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import React from 'react';
// import Payment from './Payment';



// const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)
// const Checkout = () => {
//   return (
//     <div className="my-24">
  
//   <div className='my-10'>
//     <Elements stripe={stripePromise}>
//       <Payment />
//     </Elements>
//   </div>
// </div>

//   );
// };

// export default Checkout;


import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Payment from './Payment';

// Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Checkout = () => {
  // Access location state (the package name and price)
  
  const location = useLocation();
  const packageName = location.state?.name || 'Unknown Package';
  const price = location.state?.price || 0;

  return (
    <div className="my-24 text-center">

<h1 className="text-4xl font-bold">Checkout</h1>
      <p className="text-xl mt-4">Package: {packageName}</p>
      <p className="text-xl mt-2">Price: ${price.toFixed(2)}</p>
      <div className="my-10">
        {/* Display the package name and price */}
        

        {/* Wrap Payment component with Elements provider */}
        <Elements stripe={stripePromise}>
          <Payment price={price} packageName={packageName} />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;


