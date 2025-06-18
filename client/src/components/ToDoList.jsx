import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart";
import Home from "./Home";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import Syllabus from "./Syllabus";
import Calendar from "react-calendar";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const token = localStorage.getItem("token");

  

  // Fetch todos on load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/todos", {headers:{Authorization:`Bearer ${token}`},});
        setTodos(res.data);
        console.log("Fetched todos:", res.data)
      } catch (err) {
        console.error("Error fetching todos:", err.response?.data || err.message);
      }
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/todos",{ title },{ headers: { Authorization: `Bearer ${token}`}});
      setTodos([...todos, res.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setErr(err.response.data.message);
      console.error("Error adding todo:", err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
    
          const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: "DELETE",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          });
    
          if (!response.ok) {
            console.log("Failed to delete user");
            return; 
          }
    
          setTodos(todos.filter(todo => todo._id !== id)); 
          alert("User deleted successfully!");
      };

      const toggleComplete = async (id, currentStatus) => {
  try {
    const res = await axios.patch(`http://localhost:5000/api/todos/${id}`,{completed:!currentStatus },
    { headers: { Authorization: `Bearer ${token}` } }
    );
    setTodos(todos.map(todo=>todo._id === id ? { ...todo, completed: res.data.completed}:todo));
  } catch (err) {
    console.error("Error toggling todo:", err.response?.data || err.message);
  }};
   const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  const navigate = useNavigate();
 

  return (
    <div className="min-h-screen w-full  bg-cyan-100 glass-card">
       
    <div className="flex flex-col items-center justify-center pt-8">
      {/* <div className="absolute inset-0 bg-black opacity-40 min-h-screen"></div> */}
      <h2 className="text-4xl font-semibold text-black z-20">📚 Your To-Do List</h2>

      <div className="flex flex-row gap-x-40 items-center justify-end p-8">

      <div className="mt-8 w-100">
        <div className="felx flex-row gap-x-5 rounded mb-3 bg-white/50 backdrop-blur-md" >
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className=" px-3 py-3 rounded w-82 " placeholder="Enter a task"/>
        <button onClick={handleAdd} className="bg-green-500 text-black px-4 py-1.5 rounded">Add</button>
        </div>

      {err && <div className="text-xl text-red-500 bg-white/50 backdrop-blur-md">Login/Signup to store tasks.</div>}
      <ul className="space-y-2">
        {todos.length===0?(<p className="text-black bg-white/50 backdrop-blur-md">No tasks yet.</p>):(
          [...todos].sort((a, b) => a.completed - b.completed).map((todo) => (
          <li key={todo._id} className="p-2 rounded flex justify-between items-center bg-white/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo._id, todo.completed)}/>
          <span className={todo.completed ? "line-through text-black" : "text-black"}>
            {todo.title}
          </span>
        </div>
        <button onClick={() => deleteTask(todo._id)} className="bg-red-500 text-black px-2 py-1 rounded">Delete</button>
        </li>)))}</ul>
      </div>

        <div className="w-100">
           {/* <Calendar/>   */}
          
           <div className=" ">
      {todos.length===0?(<div>
        <p className="text-red-900">Login/ Signup to view tasks statistics.</p>
         {/* <div className="text-xl  font-semibold bg-green-500 rounded-2xl p-2">
            <p>{dayOfWeek}</p>
            <p>{formattedDate}</p>
            <p>{formattedTime}</p>
          </div>  */}
      </div>):<div> <Chart total={total} completed={completed} pending={pending} /></div> }
      </div>
        </div>

        </div>

      </div> 


     

      
     </div>
  );
};

export default ToDoList;
