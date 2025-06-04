import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
			const url = "http://localhost:5000/api/auth";
			const res = await axios.post(url, formData);
      
			localStorage.setItem("token", res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // const storedUser = localStorage.getItem("user.name");
			alert("Login successful");

//       console.log("Login response:", res.data);
// console.log("User to store:", res.data.user);

      window.location = "/";
		} catch (err) {
			if (
				err.response &&
				err.response.status >= 400 &&
				err.response.status <= 500
			) {
				setErr(err.response.data.message);
			}
      alert("User Doesn't exist, kindly create account!");
		}
    
  };

   const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-green-800">
    
      <div className="flex flex-col items-center justify-center px-4 mt-16 text-center">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
          >
            Log In
          </button>
        </form>
        {err && <div className="text-red-500 text-sm text-center">{err}</div>}

          <button onClick={goToSignup}>Don't have an account?</button>
      
      </div>
    </div>
  );
}
