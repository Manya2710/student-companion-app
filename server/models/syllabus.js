const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: String,
  completed: { type: Boolean, default: false },
});

const subjectSchema = new mongoose.Schema({
  subject: String,
  topics: [topicSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Syllabus", subjectSchema);
