

import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the logged-in user's details
  const [loading, setLoading] = useState(true); // Tracks loading state
  const googleProvider = new GoogleAuthProvider();
  const [userDetails, setUserDetails] = useState(null); // Custom user details like profile picture, name, email
  const publicApi = useAxiosPublic();

  // Create a new user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign-In Logic

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user exists and log the info
      if (!user) {
        console.error("No user signed in.");
        return null; // Return null to indicate failure
      }

      console.log("User signed in:", user);

      // Optional: Get the ID token for API requests
      const idToken = await user.getIdToken();
      localStorage.setItem("access-token", idToken);

      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        profilePicture: user.photoURL || "https://i.ibb.co.com/j3SwDVp/faiza.webp",
      };
      localStorage.setItem("userDetails", JSON.stringify(userInfo));

      setUser(user); // Set the authenticated user
      setUserDetails(userInfo); // Set custom user details

      return user; // Ensure user is returned

    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Failed to sign in. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };


  //   const googleSignIn = async () => {
  //     setLoading(true);
  //     try {
  //         const result = await signInWithPopup(auth, googleProvider);
  //         const user = result.user;

  //         if (!user) {
  //             console.error("No user signed in.");
  //             return null;
  //         }

  //         // Optional: Get the ID token for API requests
  //         const idToken = await user.getIdToken();
  //         localStorage.setItem("access-token", idToken);

  //         // User data to send to the backend
  //         const userInfo = {
  //             name: user.displayName,
  //             email: user.email,
  //             image: user.photoURL || "https://via.placeholder.com/150",
  //             password: null, // Password not available for Google login
  //         };

  //         // Save user details in the backend
  //         await publicApi.post("/users", userInfo);

  //         // Store user details locally
  //         localStorage.setItem("userDetails", JSON.stringify(userInfo));

  //         setUser(user);
  //         setUserDetails(userInfo);
  //         return user;
  //     } catch (error) {
  //         console.error("Error during Google sign-in:", error);
  //         alert("Failed to sign in. Please try again.");
  //         return null;
  //     } finally {
  //         setLoading(false);
  //     }
  // };


  // Logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Track auth state changes and update userDetails
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Authenticated User:", currentUser);

        setUser(currentUser);

        // Get user details from localStorage
        const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
        setUserDetails(
          savedUserDetails || {
            displayName: currentUser.displayName || "User",
            email: currentUser.email || "",
            profilePicture: currentUser.photoURL || "https://i.ibb.co.com/j3SwDVp/faiza.webp",
          }
        );
      } else {
        console.log("No user signed in");
        setUser(null);
        setUserDetails(null);
        localStorage.removeItem("userDetails"); // Clear localStorage if no user is signed in
        localStorage.removeItem("access-token"); // Remove the access token from localStorage
      }

      setLoading(false); // Set loading to false once auth state is resolved
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //   useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //         if (currentUser) {
  //             setUser(currentUser);

  //             try {
  //                 const { data: userInfo } = await publicApi.get(`/users/${currentUser.email}`);
  //                 setUserDetails(userInfo);

  //                 // Save details in localStorage for offline access
  //                 localStorage.setItem("userDetails", JSON.stringify(userInfo));
  //             } catch (error) {
  //                 console.error("Error fetching user details:", error);
  //             }
  //         } else {
  //             setUser(null);
  //             setUserDetails(null);
  //             localStorage.removeItem("userDetails");
  //             localStorage.removeItem("access-token");
  //         }

  //         setLoading(false);
  //     });

  //     return () => {
  //         unsubscribe();
  //     };
  // }, []);


  // Auth info to be provided throughout the app
  const authInfo = {
    user,
    userDetails,
    loading,
    createUser,
    login,
    googleSignIn,
    logOut,
    setUserDetails, // Allows setting custom user details like profile picture and name
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {/* Only render children once the loading state is false */}
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



