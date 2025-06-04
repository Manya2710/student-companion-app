// src/components/TodoList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [err, setErr] = useState("");
  const token = localStorage.getItem("token");

  // Fetch todos on load
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes", {headers:{Authorization:`Bearer ${token}`},});
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
      const res = await axios.post("http://localhost:5000/api/notes",{ title },{ headers: { Authorization: `Bearer ${token}`}});
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      setErr(err.response.data.message);
      console.error("Error adding todo:", err.response?.data || err.message);
    }
  };

  const deleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
    
          const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
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
    const res = await axios.patch(`http://localhost:5000/api/notes/${id}`,{completed:!currentStatus },
    { headers: { Authorization: `Bearer ${token}` } }
    );
    setTodos(todos.map(todo=>todo._id === id ? { ...todo, completed: res.data.completed}:todo));
  } catch (err) {
    console.error("Error toggling todo:", err.response?.data || err.message);
  }
};



  return (
    <div className="flex p-4 bg-amber-300 min-h-screen rounded shadow justify-center">
      <div>
      <h2 className="text-2xl font-bold mb-4 ">📝 Save your important notes here.</h2>
      <div className="flex gap-2 mb-4 max-w-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Enter a task"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add</button>
      </div>
      {err && <div className="text-xl text-red-500">Login/Signup to store notes.</div>}
      <ul className="space-y-2">
        {todos.length===0?(<p className="text-gray-500">No tasks yet.</p>):(
          [...todos].sort((a, b) => a.completed - b.completed).map((todo) => (
          <li key={todo._id} className="border p-2 rounded flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.title}
          </span>
        </div>
        <button onClick={() => deleteTask(todo._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </li>
    ))
)}

      </ul>
      </div>
    </div>
  );
};

export default Notes;
