const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "userData", required: true},
  title: {type: String, required: true},
  completed: {type: Boolean, default: false},
});

const Todo = mongoose.model("todos", todoSchema);
module.exports={Todo, todoSchema};