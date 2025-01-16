

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const [password, setPassword] = useState(""); // Track password input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password, name, image } = data;

    // Validate the image file
    const file = image[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const profilePicture = reader.result; // Base64 image string
      createUser(email, password)
        .then((result) => {
          const loggedUser = result.user;
          setUserDetails({
            displayName: name,
            email, // Set email here as well
            profilePicture,
          });
          console.log("User created successfully:", loggedUser);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error creating user:", error.message);
        });
    };
    reader.readAsDataURL(file); // Read the image file
  };
 
  

  
  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Profile Picture Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
          <input
            type="file"
            {...register("image", { required: "Profile picture is required" })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character",
              },
            })}
            className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}

          {/* Password Requirements */}
          <div className="mt-2 text-sm text-gray-600">
            <p
              className={/[a-z]/.test(password) ? "text-green-500" : "text-red-500"}
            >
              • At least one lowercase letter
            </p>
            <p
              className={/[A-Z]/.test(password) ? "text-green-500" : "text-red-500"}
            >
              • At least one uppercase letter
            </p>
            <p className={/\d/.test(password) ? "text-green-500" : "text-red-500"}>
              • At least one number
            </p>
            <p
              className={/[@$!%*?&]/.test(password) ? "text-green-500" : "text-red-500"}
            >
              • At least one special character (@, $, !, %, *, ?, &)
            </p>
            <p
              className={password.length >= 6 ? "text-green-500" : "text-red-500"}
            >
              • Minimum 6 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Register
        </button>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Login Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300"
        >
          Login with Google
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/auth/joinUs" className="text-blue-700 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

