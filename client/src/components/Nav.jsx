import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css";


export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let user = null;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    // navigate("/login");
  };


  return (
    
    <div className="">
      <header className="flex justify-between items-center px-10 py-4 bg-gray-800 shadow-2xl/30">
        <a href='/'><h1 className="text-2xl font-bold bg-rose-800 text-white px-4 py-2 rounded hover:bg-green-500 transition">📚 Student Companion</h1></a>
        
        <nav className="space-x-4 ">
          
          {isLoggedIn ? (
          <div className='flex flex-row gap-x-7'>
            <button onClick={()=>navigate("/")}><span className="text-2xl cursor-pointer">👤</span></button>
            
            <button onClick={handleLogout} className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Logout</button>
          </div>
        ) : (
          <>
          <button onClick={() => navigate("/login")} className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-green-700 transition hover:underline">Login</button>
          <button onClick={() => navigate("/signup")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Get Started</button>
          </>
          )}
        </nav>
      </header>
         </div>
  )
}
