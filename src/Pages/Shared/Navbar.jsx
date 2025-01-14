import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: Add styling for the navbar
import logo from '../../assets/hostelimg.jpg'
import { MdOutlineCircleNotifications } from "react-icons/md";

const Navbar = ({ isLoggedIn, user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add logout functionality here
  };

  return (
   <div className='navbar-container bg-nav'>
     <nav className="navbar">
      {/* Logo and Website Name */}
      <div className="navbar-logo">
        <img src={logo} alt="" className='w-24 h-11 pr-2'/>
        <span className="website-name">Meal Planner</span>
        
      </div>

      {/* Navbar Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/meals">Meals</Link>
        </li>
        <li>
          <Link to="/meal-details">Meal Details</Link>
        </li>
        <li>
          <Link to="/upcoming-meals">Upcoming Meals</Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Notification Icon */}
        <button className="notification-icon">
        <MdOutlineCircleNotifications />
        </button>

        {isLoggedIn ? (
          // Profile Picture and Dropdown
          <div className="profile-section" onClick={handleDropdownToggle}>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <p className="dropdown-item username">{user.username}</p>
                <Link to="/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Join Us Button
          <Link to="/join-us" className="join-us-button">
            Join Us
          </Link>
        )}
      </div>
    </nav>
   </div>
  );
};

export default Navbar;