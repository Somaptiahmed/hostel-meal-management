

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [updatingAdmin, setUpdatingAdmin] = useState(null); // Track which user is being updated

  // Track the logged-in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Fetch the logged-in user (you might get this from localStorage or cookies)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage
    setLoggedInUser(user);
  }, []);

  // Fetch users from the backend based on the search query
  const fetchUsers = async (search = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://hotel-management-server-dun.vercel.app/users', {
        params: { search }, // Send the search term as a query parameter
      });
      setUsers(response.data); // Set the fetched users in the state
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchUsers when the search term changes
  useEffect(() => {
    fetchUsers(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  const makeAdmin = async (userId) => {
    // Handle making a user an admin (send a request to the backend)
    setUpdatingAdmin(userId); // Indicate that we're updating this user's status

    try {
      // Change from PUT to PATCH as per your backend
      const response = await axios.patch(`https://hotel-management-server-dun.vercel.app/users/admin/${userId}`);
      
      if (response.status === 200) {
        // Success: Update the users state with the new admin status
        setUsers((prevUsers) => 
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin: true } : user
          )
        );
      }
    } catch (error) {
      console.error('Error making user admin:', error);
    } finally {
      setUpdatingAdmin(null); // Reset updating state after action
    }
  };

  // Check if the logged-in user is active and update the status of that user
  const updateUserStatus = (user) => {
    if (loggedInUser && loggedInUser._id === user._id) {
      return 'Active'; // If logged in user, set status to Active
    }
    return user.subscriptionStatus ? 'Active' : 'Inactive'; // Default status check
  };

  return (
    <div className="users-table">
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by username or email"
        className="search-bar"
      />

      {/* Loading State */}
      {loading && <div>Loading...</div>}

      {/* Table */}
      {!loading && (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Subscription Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user.name}</td> {/* Display 'name' as 'username' */}
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {updateUserStatus(user)} {/* Dynamically set the status */}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      // If user is an admin, show "Admin" button
                      <button className="bg-green-500 text-white px-4 py-2 rounded" disabled>
                        Admin
                      </button>
                    ) : (
                      // If user is not an admin, show "Make Admin" button
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => makeAdmin(user._id)}
                        disabled={updatingAdmin === user._id} // Disable the button while updating
                      >
                        {updatingAdmin === user._id ? 'Making Admin...' : 'Make Admin'}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;


