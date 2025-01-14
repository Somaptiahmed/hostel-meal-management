import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Links */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul>
              <li>
                <Link to="/" className="hover:text-blue-400">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Meals</h3>
            <ul>
              <li>
                <Link to="/meals" className="hover:text-blue-400">Meals</Link>
              </li>
              <li>
                <Link to="/upcoming-meals" className="hover:text-blue-400">Upcoming Meals</Link>
              </li>
              <li>
                <Link to="/meal-plans" className="hover:text-blue-400">Meal Plans</Link>
              </li>
              <li>
                <Link to="/specials" className="hover:text-blue-400">Specials</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Instagram</a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Sign up for our newsletter and get the latest updates on new meals and special offers!</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md w-2/3 text-black"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; 2025 Meal Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
