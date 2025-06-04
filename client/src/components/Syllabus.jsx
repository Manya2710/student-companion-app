import React, { useState, useEffect } from "react";
import axios from "axios";

const Syllabus = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [newTopic, setNewTopic] = useState({});
  const [topics, setTopics] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try{
    const { data } = await axios.get("http://localhost:5000/api/topics", {headers: { Authorization: `Bearer ${token}`},
    });
    setSubjects(data);
    console.log("Fetched syllabus");
  }catch(err){
    console.log("Error fetching syllabus");
  }
  };

  useEffect(() => {fetchData()}, []);

  const addSubject = async () => {
    await axios.post("http://localhost:5000/api/topics/add-subject", { subject: newSubject }, {
      headers:{Authorization:`Bearer ${token}`},});
    setNewSubject("");
    fetchData();
  };

  const addTopic = async (subjectId) => {
    await axios.post("http://localhost:5000/api/topics/add-topic", { subjectId, topic: newTopic }, {
      headers:{Authorization:`Bearer ${token}`},
    });
    setNewTopic({ ...newTopic, [subjectId]: "" });
    fetchData();
  };

 

  const deleteTopic = async (id) => {
        if (!window.confirm("Are you sure you want to delete this topic?")) return;
    
          const response = await fetch(`http://localhost:5000/api/topics/${id}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json"},
          });
    
          if (!response.ok) {
            console.log("Failed to delete topic");
            return; 
          }
          setTopics(topics.filter(topic => topic._id !== id)); 
          alert("Topic deleted successfully!");
      };

  const toggleTopic = async (subjectId, index) => {
    await axios.post("http://localhost:5000/api/topics/toggle-topic", { subjectId, topicIndex: index }, {
      headers:{Authorization:`Bearer ${token}`},
    });
    fetchData();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Syllabus Manager</h1>

      <div className="mb-4">
        <input
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="New Subject"
          className="border px-2 py-1 mr-2"
        />
        <button onClick={addSubject} className="bg-yellow-500 text-white px-3 py-1 rounded">Add Subject</button>
      </div>

      {subjects.map((subj) => (
        <div key={subj._id} className="border p-3 mb-4 rounded bg-white shadow">
          <h2 className="text-xl font-semibold">{subj.subject}</h2>

          <div className="mt-2">
            {subj.topics.map((topic, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={topic.completed}
                  onChange={() => toggleTopic(subj._id, idx)}
                />
                <span className={topic.completed ? "line-through text-gray-500" : ""}>
                  {topic.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2">
            <input
              value={newTopic[subj._id] || ""}
              onChange={(e) => setNewTopic({ ...newTopics, [subj._id]: e.target.value })}
              placeholder="New Topic"
              className="border px-2 py-1 mr-2"
            />
            <button onClick={() => addTopic(subj._id)} className="bg-green-500 text-white px-3 py-1 rounded">
              Add Topic
            </button>
            <button onClick={() => deleteTopic(subj._id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete Topic
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Syllabus;
