import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useBinFinder } from "../utils/useBinContext";

export default function Signup() {
  const { userName, backendURL } = useBinFinder();

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (userName) {
      navigate("/", { replace: true });
    }
  }, [userName, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    // call API here

    const res = axios
      .post(backendURL + "/api/public/signup", {
        userName: formData.username,
        password: formData.password,
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
        // On success
        // navigate to login
        navigate("/login");
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });

    console.log(res);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('map.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/50 z-0"></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative z-10">
        <div className="mb-6 text-center">
          <img
            src="BinFinder2.jpeg"
            alt="Signup"
            className="inline-block max-h-64 object-contain rounded-t-2xl mb-6"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
