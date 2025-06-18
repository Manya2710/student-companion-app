import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
   const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [err, setErr] = useState("");
    const [editId, setEditId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // true = view, false = edit
    const [viewMode, setViewMode] = useState(true); 
    const [selectedNote, setSelectedNote] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");


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
    if (!title.trim() || !description.trim()) return;
    try {
      const res = await axios.post("http://localhost:5000/api/notes",{ title, description },{ headers: { Authorization: `Bearer ${token}`}});
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

      const handleUpdate = async (id) => {
        try {
          const res = await axios.patch(`http://localhost:5000/api/notes/${id}`,{title: editTitle, description: editDescription},{headers: {Authorization: `Bearer ${token}`,}});
          const updatedTodos = todos.map((todo) =>
            todo._id === id ? res.data : todo
          );
          setTodos(updatedTodos);
          setModalOpen(false);
          setEditId(null);
          setViewMode(true);
          setSelectedNote(null);
        } catch (err) {
          console.error("Error updating note:", err.response?.data || err.message);
        }
      };


  
  return (
    <div className="flex flex-col gap-y-8 glass-card min-h-screen rounded shadow ">
      
        <div >
          <h1 className="text-3xl m-8">📚 Save you importnat thoughts and notes right here!</h1>
        </div>
        <div className="flex flex-row gap-x-5 items-center justify-center">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className=" px-3 py-3 rounded w-82 bg-white/50 backdrop-blur-md" placeholder="Enter a task"/>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className=" px-3 py-3 rounded w-82 bg-white/50 backdrop-blur-md" placeholder="Enter the description"/>
        <button onClick={handleAdd} className="bg-green-500 text-black p-3.5  rounded">Add</button>
        </div>
       
      <div className="px-20 grid grid-cols-3 gap-10">
        {todos && todos.length > 0 ? (todos.map((task) => (
            <div key={task._id} className="p-4 bg-white/50 backdrop-blur-md rounded mb-2 w-80 ">
                  <h2 className="text-xl font-bold text-black">{task.title}</h2>
                  <p className="mb-2 text-gray-900">{task.description}</p>
                  <button onClick={() => {
                      setViewMode(false);
                      setModalOpen(true);
                      setSelectedNote(task);
                      setEditTitle(task.title);
                      setEditDescription(task.description);
                    }} className="bg-cyan-100 text-black px-4 py-1 mr-2 rounded">Edit</button>
                  <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
                </div>))) : (<h1 className="bg-white/50 backdrop-blur-md text-xl">No tasks yet.</h1>)}

      </div>

      {modalOpen && selectedNote && (
  <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center ">
    <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
      <button
        className="absolute top-2 right-4 text-xl"
        onClick={() => setModalOpen(false)}
      >
        &times;
      </button>

      {viewMode ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">{selectedNote.title}</h2>
          <p className="text-gray-700">{selectedNote.description}</p>
          <div className="mt-4 flex justify-end">
            <button className="bg-yellow-500 text-white px-4 py-1 mr-2 rounded"
              onClick={() => {setViewMode(false)}}>Edit</button>
          </div>
        </>
      ) : (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="bg-white/50 backdrop-blur-md px-2 py-1 mb-3 w-full"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="bg-white/50 backdrop-blur-md px-2 py-1 w-full mb-3"
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => handleUpdate(selectedNote._id)}
            >
              Save
            </button>
            <button
              className="bg-gray-400 px-4 py-1 rounded"
              onClick={() => setViewMode(true)}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}


      <div className="p-10"></div>

    </div>
    // </div>
  );
};

export default Notes;
