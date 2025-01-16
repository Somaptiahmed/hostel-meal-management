

import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the logged-in user's details
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [userDetails, setUserDetails] = useState(null); // Custom user details like profile picture, name, email

  // Create a new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Track auth state changes and update userDetails
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        console.log("Authenticated User:", currentUser);
        setUserDetails({
          displayName: currentUser.displayName || "User",
          email: currentUser.email || "",
          profilePicture: currentUser.photoURL || "https://via.placeholder.com/150",
        });
      } else {
        console.log("No user signed in");
        setUserDetails(null);
      }
      setLoading(false);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  // Auth info to be provided throughout the app
  const authInfo = {
    user,
    userDetails,
    loading,
    createUser,
    login,
    logOut,
    setUserDetails, // Allows setting custom user details like profile picture and name
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

