// import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import app from "../firebase/firebase.config";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);
// const AuthProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
    
//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password)
//     }
//     const login = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     }
    
//     useEffect(() => {
//        const unsubscribe = onAuthStateChanged(auth, currentUser => {
//             setUser(currentUser);
//             console.log(currentUser);
//             setLoading(false);
//         });
//         return () => {
//             return unsubscribe;
//         }

//     }, [])
//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         login,   
//         logOut 


//     }
//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

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
  const [userDetails, setUserDetails] = useState(null); // Custom user details like profile picture, name

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

  // Track auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Populate userDetails with additional properties (e.g., displayName)
        setUserDetails({
          displayName: currentUser.displayName || "User",
          profilePicture:
            currentUser.photoURL ||
            "https://via.placeholder.com/150", // Default profile picture
        });
      } else {
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
