

// import React, { createContext, useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import app from "../firebase/firebase.config";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// export const AuthContext = createContext(null);

// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Stores the logged-in user's details
//   const [loading, setLoading] = useState(true); // Tracks loading state
//   const googleProvider = new GoogleAuthProvider();
//   const [userDetails, setUserDetails] = useState(null); // Custom user details like profile picture, name, email
//   const publicApi = useAxiosPublic();

//   // Create a new user with email and password
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // Login user with email and password
//   const login = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // const googleSignIn = () => {
//   //   setLoading(true);
//   //   return signInWithPopup(auth, googleProvider)
//   // }
//   const googleSignIn = async () => {
//     setLoading(true);
//     try {
//         const result = await signInWithPopup(auth, googleProvider);
//         // Optional: Extract and handle user information
//         const user = result.user;
//         console.log("User signed in:", user);
//         return user; // Return user object to handle in the calling function if necessary
//     } catch (error) {
//         console.error("Error during Google sign-in:", error);
//         // Optional: Display error message to the user
//         alert("Failed to sign in. Please try again.");
//     } finally {
//         setLoading(false); // Ensure loading state is reset
//     }
// };


//   // Logout user
//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // Track auth state changes and update userDetails
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         console.log("Authenticated User:", currentUser);

//         setUser(currentUser);
//         const userInfo = {
//           email: user.email,
//           name: user.displayName,
//         };
        
            

//         // Get user details from localStorage
//         const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
//         setUserDetails(
//           savedUserDetails || {
//             displayName: currentUser.displayName || "User",
//             email: currentUser.email || "",
//             profilePicture: currentUser.photoURL || "https://via.placeholder.com/150",
//           }
//         );
//       } else {
//         console.log("No user signed in");
//         setUser(null);
//         setUserDetails(null);
//         localStorage.removeItem("userDetails"); // Clear localStorage if no user is signed in
//       }

//       setLoading(false); // Set loading to false once auth state is resolved
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   // Auth info to be provided throughout the app
//   const authInfo = {
//     user,
//     userDetails,
//     loading,
//     createUser,
//     login,
//     googleSignIn,
//     logOut,
//     setUserDetails, // Allows setting custom user details like profile picture and name
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>
//       {/* Only render children once the loading state is false */}
//       {!loading ? children : <div>Loading...</div>}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


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

  // Login user with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign-In Logic
  // const googleSignIn = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;

  //     console.log("User signed in:", user);

  //     // Optional: Get the ID token for API requests
  //     const idToken = await user.getIdToken();

  //     // Store the token in localStorage
  //     localStorage.setItem("access-token", idToken);

  //     // Also, store user details in localStorage
  //     const userInfo = {
  //       displayName: user.displayName,
  //       email: user.email,
  //       profilePicture: user.photoURL || "https://via.placeholder.com/150",
  //     };
  //     localStorage.setItem("userDetails", JSON.stringify(userInfo));

  //     // Set user details in state
  //     setUser(user);
  //     setUserDetails(userInfo);
  //   } catch (error) {
  //     console.error("Error during Google sign-in:", error);
  //     alert("Failed to sign in. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
        profilePicture: user.photoURL || "https://via.placeholder.com/150",
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
            profilePicture: currentUser.photoURL || "https://via.placeholder.com/150",
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

