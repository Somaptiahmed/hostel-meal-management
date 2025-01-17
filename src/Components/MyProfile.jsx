import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyProfile = () => {
  const { userDetails, setUserDetails } = useContext(AuthContext); // Access user details and setter from AuthContext
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [newName, setNewName] = useState(userDetails?.displayName || ""); // Hold the new name input

  // Save the new name
  const handleSave = () => {
    if (newName.trim() === "") return; // Prevent empty name

    const updatedDetails = { ...userDetails, displayName: newName };
    setUserDetails(updatedDetails); // Update in AuthContext
    localStorage.setItem("userDetails", JSON.stringify(updatedDetails)); // Persist in localStorage
    setIsEditing(false); // Exit edit mode
  };

  // Cancel editing
  const handleCancel = () => {
    setNewName(userDetails?.displayName || ""); // Reset input to original name
    setIsEditing(false);
  };

  const email = userDetails?.email || "No email provided";
  const profilePicture =
    userDetails?.profilePicture || "https://via.placeholder.com/150";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col items-center p-6">
        {/* Profile Image */}
        <img
          src={profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        
        {/* Name with Edit Option */}
        <div className="mt-4 text-center">
          {isEditing ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border-2 border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new name"
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {userDetails?.displayName || "Guest User"}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 text-blue-500 underline"
              >
                Edit Name
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <p className="text-gray-600 mt-4">{email}</p>
      </div>
    </div>
  );
};

export default MyProfile;

