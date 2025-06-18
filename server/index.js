const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const config = require("./config");
const mongoose = require('mongoose');
const multer = require('multer');
const userRoutes = require("./routes/users");
const authRoutes = require("./middleware/auth");
const todoRoutes = require("./routes/todo");
const noteRoutes = require("./routes/note");
const uploadRoute = require("./routes/upload");


const port = config.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/upload", uploadRoute);
app.use("/uploads", express.static("uploads"));



mongoose.connect('mongodb://127.0.0.1:27017/asdfghjkl').then(()=>{
    console.log("connected to mongoDB")
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })  
}).catch((err)=> 
    console.log("Error connecting", err))

