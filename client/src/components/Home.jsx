import { useNavigate } from "react-router-dom";
import React from 'react'
import { Link } from "react-router-dom";
import ToDoList from "./ToDoList";
import Timer from "./Timer";
import Syllabus from "./Syllabus";
import Calendar from "react-calendar";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-l from-amber-500 to-amber-300 min-h-screen w-full">


      {/* <main className="flex flex-col items-center justify-center p-6 text-center"> */}
        {/* <h2 className="text-2xl mb-4 pt-1.5">Your All-in-One Study Hub</h2>
        <p className="m-4">Organize your academics with smart tools: AI Assistant, Syllabus Manager, To-Do List, Study Timer, and more.</p> */}

       <div className="flex flex-row gap-x-50">
       
        <div className=" border-1 bg-amber-200 border-amber-500 mt-5">
          {[
            ["AI Assistant", "Get instant help with your doubts"],
            ["To-Do List", "Stay productive with daily goals", "./ToDoList" ],
            ["Syllabus Manager", "Track your syllabus with ease", "./Syllabus"],
            ["Study Timer", "Focus with Pomodoro-style tracking", "./Timer"],
            ["Logic Games", "Sharpen your mind during breaks"],
            ["Community Chat", "Connect and collaborate with peers"],
            ["Notes", "Store your precious notes at one place", "./Notes"]
          ].map(([title, desc, link], idx) => (
            <div key={idx} className="p-4  border-1 border-amber-400 ">
              <Link key={idx} to={link} >
              <h3 className="font-semibold text-green-600">{title}</h3>
              <p className="text-sm text-gray-700">{desc}</p>
              </Link>
            </div>
          ))}
        </div>
      {/* </main> */}

      <div className="mt-5"><Calendar/></div>
      </div>

      <footer className="mt-24 text-center text-sm text-gray-700 pb-6">
        © {new Date().getFullYear()} Student Companion. Built for Students, by Students.
      </footer>
    </div>
  );
}
