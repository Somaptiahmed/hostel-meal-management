import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';  // Assuming you're using AuthContext to get the logged-in user details

const PaymentHistory = () => {
  const { userDetails } = useContext(AuthContext);  // Get logged-in user's details from AuthContext
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userDetails?.email) {
      // Fetch payment history for the logged-in user
      const fetchPaymentHistory = async () => {
        try {
          const response = await fetch(`http://localhost:5000/payments?email=${userDetails.email}`);
          const data = await response.json();

          if (response.ok) {
            setPayments(data);  // Set the payments in state
          } else {
            setError(data.message || 'Failed to fetch payments');
          }
        } catch (error) {
          console.error('Error fetching payment history:', error);
          setError('Failed to fetch payment history');
        }
      };

      fetchPaymentHistory();
    }
  }, [userDetails]);

  return (
    <div className="payment-history-container">
      <h2 className="text-2xl font-bold text-center mb-6">Your Payment History</h2>

      {/* Show error if no payments are found */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display payment history */}
      {payments.length > 0 ? (
        <div className="payment-history-list">
          {payments.map((payment) => (
            <div key={payment._id} className="payment-history-item p-4 mb-4 bg-white shadow-lg rounded">
              <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
              <p><strong>Package Name:</strong> {payment.packageName}</p>
              <p><strong>Price:</strong> ${payment.price}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Date:</strong> {new Date(payment.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No payment history available.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
