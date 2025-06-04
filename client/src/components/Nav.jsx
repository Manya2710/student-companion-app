import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
    navigate("/login");
  };


  return (
    
    <div className='shadow-2xl'>
      <header className="flex justify-between items-center px-10 py-4 shadow-lg bg-amber-500">
        <a href='/'><h1 className="text-2xl font-bold bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition">📚 Student Companion</h1></a>
        
        <nav className="space-x-4 ">
          
          {isLoggedIn ? (
          <div className='flex flex-row gap-x-7'>
            <button onClick={()=>navigate("/")}><span className="text-2xl cursor-pointer">👤</span></button>
            
            <button onClick={handleLogout} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Logout</button>
          </div>
        ) : (
          <>
          <button onClick={() => navigate("/login")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition hover:underline">Login</button>
          <button onClick={() => navigate("/signup")} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Get Started</button>
          </>
          )}
        </nav>
      </header>
    </div>
  )
}
