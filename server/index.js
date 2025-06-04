const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const config = require("./config");
const mongoose = require('mongoose')
const userRoutes = require("./routes/users");
const authRoutes = require("./middleware/auth");
const todoRoutes = require("./routes/todo");
const noteRoutes = require("./routes/note");
const topicRoutes = require("./routes/syllabus");


const port = config.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/topics", topicRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/admin').then(()=>{
    console.log("connected to mongoDB")
    app.listen(port, ()=>{
        // console.log("JWT Secret:", config.jwtPrivateKey);
        console.log(`Server is running on port ${port}`)
    })  
}).catch((err)=> 
    console.log("Error connecting", err))

