import { useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {motion} from "framer-motion";
import "../index.css";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [now, setNow] = useState(new Date());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = now.toDateString();
  const formattedTime = now.toLocaleTimeString();

   useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/todos", {headers:{Authorization:`Bearer ${token}`},});
        console.log("Fetched todos:", res.data)
        setTodos(res.data);
      } catch (err) {
        console.error("Error fetching todos:", err.response?.data || err.message);
      }
    };
    fetchTodos();
  }, []);

  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen w-full flex flex-col gap-y-10 bg-gray-900">

      <div className="relative bg-cover bg-center bg-no-repeat  flex flex-col items-center justify-center h-screen" style={{ backgroundImage: `url('/bg2.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
        <h2 className="text-4xl font-semibold text-white z-20">Your All-in-One Study Hub</h2>
        <p className="m-4 w-2xs text-2xl font-semibold text-blue-100 z-20">Organize your academics with smart tools: Syllabus Manager, To-Do List, Study Timer, and more.</p>
      </div>

       <div className=" text-xl"> 
        <div className="text-4xl"> Tools available:</div>
          <section className="ml-28 grid sm:grid-cols-2 md:grid-cols-3 gap-y-10 mt-16 min-w-screen">
          {[
            ["🤖 AI Assistant", "Get instant help with your doubts.                       (Under progress)"],
            ["📌 To-Do List", "Stay productive with daily goals.", "./ToDoList" ],
            ["📚 Syllabus Manager", "Track your syllabus with ease.", "./Syllabus"],
            ["📚 Notes", "Store your precious notes at one place.", "./Notes"],
            ["🎯 Study Timer", "Focus with Pomodoro-style tracking.", "./Timer"],
            ["🧠 Logic Games", "Sharpen your mind during breaks.", "./Game"],
            // ["👥 Community Chat", "Connect and collaborate with peers"]
          ].map(([title, desc, link], idx) => (
            <motion.div key={idx} className=" p-10 bg-gray-800 shadow rounded-lg h-40 w-76"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}>
              <Link key={idx} to={link} >
              <h3 className="font-semibold text-indigo-600">{title}</h3>
              <p className="text-sm text-gray-300">{desc}</p>
              </Link>
            </motion.div>
          ))}
        </section>
        <div className="h-20"></div>
      </div> 
    </div>
  );
}