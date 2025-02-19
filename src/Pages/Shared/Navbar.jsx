
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCircleNotifications } from "react-icons/md";

import logo from "../../assets/hostelimg.jpg"; // Ensure this path is correct
import "./Navbar.css"; // Add custom styling if needed
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { userDetails, logOut } = useContext(AuthContext); // Access userDetails and logOut from context
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully.");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="navbar-container bg-primary fixed top-0 left-0 w-full shadow-md z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo and Website Name */}
        <div className="navbar-logo flex items-center">
          <img src={logo} alt="Logo" className="w-16 h-12 pr-2" />
          <span className="text-xl font-bold text-white">Meal Planner</span>
        </div>

        {/* Navbar Links */}
        <ul className="navbar-links flex space-x-6 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/meals" className="hover:text-gray-300">
              Meals
            </Link>
          </li>
          <li>
            <Link to="/upcoming-meals" className="hover:text-gray-300">
              Upcoming Meals
            </Link>
          </li>
          {userDetails && (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-gray-300">
                  Dashboard
                </Link>
              </li>
              
            </>
          )}
        </ul>

        {/* Right Section */}
        <div className="navbar-right flex items-center gap-4">
          {/* Notification Icon */}
          {userDetails && (
            <button
              className="notification-icon text-white hover:text-gray-300"
              title="Notifications"
            >
              <MdOutlineCircleNotifications size={24} />
            </button>
          )}

          {userDetails ? (
            // Profile Picture and Dropdown
            <div className="relative">
              <img
                src={userDetails.profilePicture}
                alt="Profile"
                className="profile-picture w-10 h-10 rounded-full cursor-pointer"
                onClick={handleDropdownToggle}
              />
              {showDropdown && (
                <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <p className="dropdown-item username px-4 py-2 text-gray-700 font-semibold border-b">
                    {userDetails.displayName}
                  </p>
                  <Link
                    to="/dashboard"
                    className="dropdown-item px-4 py-2 hover:bg-gray-100 text-gray-700 block"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Join Us Button
            <Link
              to="/auth/joinUs"
              className="join-us-button bg-white text-primary px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Join Us
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;




