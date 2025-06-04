const express = require("express");
const router = express.Router();
const Syllabus = require("../models/syllabus");
const authMiddleware = require("../middleware/todo");

// Get all subjects for user
router.get("/", authMiddleware, async (req, res) => {
  const data = await Syllabus.find({ user: req.userId });
  res.json(data);
});

// Add subject
router.post("/add-subject", authMiddleware, async (req, res) => {
  const { subject } = req.body;
  const newSubject = new Syllabus({ subject, topics: [], user: req.userId });
  await newSubject.save();
  res.json({ message: "Subject added" });
});

// Add topic
router.post("/add-topic", authMiddleware, async (req, res) => {
  const { subjectId, topic } = req.body;
  const subj = await Syllabus.findOne({ _id: subjectId, user: req.userId });
  subj.topics.push({ name: topic });
  await subj.save();
  res.json({ message: "Topic added" });
});

// Toggle topic completion
router.post("/toggle-topic", authMiddleware, async (req, res) => {
  const { subjectId, topicIndex } = req.body;
  const subj = await Syllabus.findOne({ _id: subjectId, user: req.userId });
  subj.topics[topicIndex].completed = !subj.topics[topicIndex].completed;
  await subj.save();
  res.json({ message: "Toggled" });
});

// Edit topic
router.put("/edit-topic", authMiddleware, async (req, res) => {
  const { subjectId, topicIndex, newName } = req.body;
  const subj = await Syllabus.findOne({ _id: subjectId, user: req.userId });
  subj.topics[topicIndex].name = newName;
  await subj.save();
  res.json({ message: "Edited successfully" });
});

// Delete topic
router.delete("/delete-topic", authMiddleware, async (req, res) => {
  const { subjectId, topicIndex } = req.body;
  const subj = await Syllabus.findOne({ _id: subjectId, user: req.userId });
  subj.topics.splice(topicIndex, 1);
  await subj.save();
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
