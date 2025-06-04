const router = require("express").Router();
const {Todo, todoSchema} = require("../models/todo");
const authTodo = require("../middleware/todo");
const { User, validate } = require("../models/user");
// Get all todos for logged-in user



router.get("/", authTodo, async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id });
  res.send(todos);
});

// Create a new todo
router.post("/", authTodo, async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.user._id,
      title: req.body.title,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (err) {
    console.error("Error saving todo:", err);
    res.status(500).send({ message: "Something went wrong" });
  }
});


// Toggle complete
router.patch("/:id", authTodo, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { $set: { completed: req.body.completed } },
    { new: true }
  );

  if (!todo) return res.status(404).send({ message: "Todo not found" });
  res.send(todo);
});

// Delete todo
router.delete("/:id", authTodo, async (req, res) => {
  const result = await Todo.deleteOne({ _id: req.params.id, userId: req.user._id });
  if (result.deletedCount === 0)
    return res.status(404).send({ message: "Todo not found" });

  res.send({ message: "Todo deleted" });
});

module.exports = router;
