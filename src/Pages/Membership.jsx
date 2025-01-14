import React from 'react';
import { Link } from 'react-router-dom';

const Membership = () => {
  return (
    <div className="premium-packages py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Upgrade to Premium</h2>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Silver Package */}
          <div className="package-card bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Silver Package</h3>
            <p className="text-lg text-gray-700 mb-4">Basic features with limited access</p>
            <p className="text-3xl font-bold text-blue-500 mb-6">$19.99 / month</p>
            <Link
              to="/checkout/silver"
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Upgrade Now
            </Link>
          </div>

          {/* Gold Package */}
          <div className="package-card bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Gold Package</h3>
            <p className="text-lg text-gray-700 mb-4">Access to most features with extra perks</p>
            <p className="text-3xl font-bold text-yellow-500 mb-6">$39.99 / month</p>
            <Link
              to="/checkout/gold"
              className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition duration-300"
            >
              Upgrade Now
            </Link>
          </div>

          {/* Platinum Package */}
          <div className="package-card bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Platinum Package</h3>
            <p className="text-lg text-gray-700 mb-4">Premium features with full access</p>
            <p className="text-3xl font-bold text-gray-800 mb-6">$59.99 / month</p>
            <Link
              to="/checkout/platinum"
              className="bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-900 transition duration-300"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
