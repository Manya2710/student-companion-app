import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart";
import Home from "./Home";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const token = localStorage.getItem("token");

 
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

  
  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/todos",{ title },{ headers: { Authorization: `Bearer ${token}`}});
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      setErr(err.response.data.message);
      console.error("Error adding todo:", err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
    
          const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
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
    <div className="bg-gradient-to-l from-amber-400 to-amber-300 min-h-screen px-30 py-5">
      
    <div >
      <h2 className="text-2xl font-bold mb-10 pt-5">📝 Your To-Do List</h2>
      <div className="w-7xl flex flex-row gap-x-30">


      <div className="gap-2 mb-4 w-100">
        <div className="felx flex-row gap-x-5">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border px-3 py-2 rounded w-80 " placeholder="Enter a task"/>
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
        </div>

      {err && <div className="text-xl text-red-500">Login/Signup to store tasks.</div>}
      <div><button onClick={()=>navigate('../Chart')}><span>View Stats...</span></button></div>
      <ul className="space-y-2">
        {todos.length===0?(<p className="text-gray-500">No tasks yet.</p>):(
          [...todos].sort((a, b) => a.completed - b.completed).map((todo) => (
          <li key={todo._id} className="border p-2 rounded flex justify-between items-center">
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo._id, todo.completed)}/>
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.title}
          </span>
        </div>
        <button onClick={() => deleteTask(todo._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </li>)))}</ul>



      </div>

      
      <div className="min-w-2xl min-h-screen">
      {todos.length===0?(<p> </p>):<div> <Chart total={total} completed={completed} pending={pending} /></div> }
      </div>

      </div>
       
      
    </div>
    </div>
  );
};

export default ToDoList;
