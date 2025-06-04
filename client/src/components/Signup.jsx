import React, { useState } from 'react';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom'; 
const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
 const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [err, setErr] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const url = "http://localhost:5000/api/users";
        const {formData: res} = await axios.post(url, formData);
        navigate("/Login");
        console.log(res.message);
    }catch(err){
        if(err.response && err.response.status >= 400 && err.response.status <=500){
            setErr(err.response.data.message);
        }
    }
    // TODO: Add validation and call API
    console.log(formData);
  };

 
  const goToLogin = () => {
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-green-800">
  
        <div className="flex flex-col items-center justify-center px-4 mt-16 text-center">
      <form onSubmit={handleSubmit} >
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        <div>
          <label className="block text-sm font-medium text-gray-600">First Name</label>
          <input
            type="text"
            name="firstName"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition duration-200"
        >
          Create Account
        </button>
        {err && <div className='text-red-500'>{err}</div>}
      </form>
      <button onClick={goToLogin}>Login</button>
      </div>
      
    </div>
  );
};

export default Signup;
