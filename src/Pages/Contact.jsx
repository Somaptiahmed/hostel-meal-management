import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa'; // Using react-icons for phone icon
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Fake social media logos

const Contact = () => {
  return (
    <div className="contact-section py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>

        {/* Contact Numbers */}
        <div className="contact-numbers grid md:grid-cols-3 gap-8">
          <div className="contact-card bg-white p-6 rounded-lg shadow-lg text-center">
            <FaPhoneAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold">+1 800 123 456</h3>
            <p className="text-sm text-gray-500">Customer Support</p>
          </div>

          <div className="contact-card bg-white p-6 rounded-lg shadow-lg text-center">
            <FaPhoneAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold">+1 800 654 321</h3>
            <p className="text-sm text-gray-500">Sales Inquiries</p>
          </div>

          <div className="contact-card bg-white p-6 rounded-lg shadow-lg text-center">
            <FaPhoneAlt className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold">+1 800 987 654</h3>
            <p className="text-sm text-gray-500">Technical Support</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Contact;
