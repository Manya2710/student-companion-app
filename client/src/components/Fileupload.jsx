import React, { useState } from 'react';
import axios from 'axios';

function Fileupload() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {headers: {"Content-Type": "multipart/form-data"}});
      alert("File uploaded successfully");
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };

  return (
    <div className="p-4 bg-white/30 backdrop-blur-md">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 px-4 py-2 text-white">Upload</button>
    </div>
  );
}

export default Fileupload;
