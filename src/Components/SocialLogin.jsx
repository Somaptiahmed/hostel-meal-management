
import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic'

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const publicApi = useAxiosPublic();
  const navigate = useNavigate();

//   const handleGoogleSignIn = async () => {
//     try {
//       const user = await googleSignIn(); // Ensure the resolved `user` object is returned
//       if (!user) {
//         console.error("No user returned from Google sign-in.");
//         return;
//       }

//       const userInfo = {
//         email: user.email,
//         name: user.displayName,
//       };

//       console.log("User Info to Save:", userInfo);

//       // Post user info to the server
//       const response = await publicApi.post('/users', userInfo);
//       console.log("Server Response:", response.data);

//       // Navigate to home page or another route
//       navigate('/');
//     } catch (error) {
//       console.error("Error during Google Sign-In:", error);
//       alert("Failed to sign in. Please try again.");
//     }
//   };
const handleGoogleSignIn = async () => {
    try {
      const user = await googleSignIn(); // Ensure the resolved `user` object is returned
      if (!user) {
        console.error("No user returned from Google sign-in.");
        return;
      }
  
      const userInfo = {
        email: user.email,
        name: user.displayName,
      };
  
      console.log("User Info to Save:", userInfo);
  
      // Post user info to the server
      const response = await publicApi.post('/users', userInfo);
      console.log("Server Response:", response.data);
  
      // Navigate to home page or another route
      navigate('/');
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      alert("Failed to sign in. Please try again.");
    }
  };
  
  return (
    <div className="social-login">
      {/* Google Login Button */}
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.5 12.275c0-.85-.075-1.675-.2-2.475H12v4.7h6.5a5.625 5.625 0 01-2.45 3.7v3.05h3.95c2.3-2.1 3.6-5.2 3.6-8.975z" fill="#4285F4" />
          <path d="M12 24c3.25 0 5.975-1.075 7.95-2.925l-3.95-3.05c-1.1.75-2.5 1.175-4 1.175-3.1 0-5.725-2.1-6.65-4.9H2.3v3.075C4.275 21.375 7.8 24 12 24z" fill="#34A853" />
          <path d="M5.35 14.3a7.15 7.15 0 010-4.6V6.625H2.3a12 12 0 000 10.75l3.05-3.075z" fill="#FBBC05" />
          <path d="M12 4.8c1.775 0 3.375.6 4.625 1.775l3.45-3.45A11.625 11.625 0 0012 0C7.8 0 4.275 2.625 2.3 6.625l3.05 3.075c.925-2.8 3.55-4.9 6.65-4.9z" fill="#EA4335" />
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;

