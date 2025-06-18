const express = require("express");
const router = express.Router();
const {Task} = require("../models/task");
const authMiddleware = require("../middleware/todo");

// Get all subjects for user
router.get("/", authMiddleware, async (req, res) => {
  try{
  const tasks = await Task.find({ user: req.userId }).sort({createdAt: -1});
  res.status(200).json(tasks);
  }catch(err){
    res.status(600).send("Error!!!!!!!");
  }
});

// Add subject
router.post("/", authMiddleware, async (req, res) => {
  try {
    const taskData = req.body;
    taskData.userId = req.user._id;  // Inject userId from token
    const newTask = new Task(taskData);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  // const newSubject = new Task({ ...req.body, topics: [], user: req.userId });
  // await newSubject.save();
  // res.status(201).json({ message: "Subject added" });
});

// Add topic
router.post("/add-topic", authMiddleware, async (req, res) => {
  const { subjectId, topic } = req.body;
  const subj = await Task.findOne({ _id: subjectId, user: req.userId });
  subj.topics.push({ name: topic });
  await subj.save();
  res.json({ message: "Topic added" });
});

// // Toggle topic completion
// router.post("/toggle-topic", authMiddleware, async (req, res) => {
//   const { subjectId, topicIndex } = req.body;
//   const subj = await Syllabus.findOne({ _id: subjectId, user: req.userId });
//   subj.topics[topicIndex].completed = !subj.topics[topicIndex].completed;
//   await subj.save();
//   res.json({ message: "Toggled" });
// });

// Edit topic
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete topic
router.delete("/:id", authMiddleware, async (req, res) => {
  const { subjectId, topicIndex } = req.body;
  const subj = await Task.findOne({ _id: subjectId, user: req.userId });
  subj.topics.splice(topicIndex, 1);
  await subj.save();
  res.status().json({ message: "Deleted successfully" });
});

module.exports = router;
