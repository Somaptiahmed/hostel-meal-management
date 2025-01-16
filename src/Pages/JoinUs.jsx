
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const JoinUs = () => {
  const { login, handleGoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await login(email, password);
      const user = result.user;
      console.log("Logged in user:", user);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="my-28">
      <h2 className="text-3xl font-bold text-gray-900 text-center">Join Us</h2>
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 mb-10"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Email</span>
          </label>
          <input
            className="w-full border-2 border-gray-300 rounded-lg p-3"
            placeholder="Enter your email"
            type="email"
            name="email"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-gray-700">Password</span>
          </label>
          <input
            className="w-full border-2 border-gray-300 rounded-lg p-3"
            placeholder="Enter your password"
            type="password"
            name="password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-blue-700 text-white py-3 rounded-lg"
        >
          <FaGoogle />
          Login with Google
        </button>

        <p>
          Don't Have an Account?{" "}
          <Link to="/auth/register">
            <button className="text-red-700">Create New Account</button>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default JoinUs;
