const router = require("express").Router();
const {Note, noteSchema} = require("../models/note");
const authTodo = require("../middleware/todo");


router.get("/", authTodo, async (req, res) => {
  const notes = await Note.find({ userId: req.user._id });
  res.send(notes);
});


router.post("/", authTodo, async (req, res) => {
  try {
    const note = new Note({
      userId: req.user._id,
      title: req.body.title,
      description: req.body.description
    });
    await note.save();
    console.log(req.body.title, req.body.description);
    res.status(201).send(note);
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).send({ message: "Something went wrong" });
  }
});


// Delete todo
router.delete("/:id", authTodo, async (req, res) => {
  const result = await Note.deleteOne({ _id: req.params.id, userId: req.user._id });
  if (result.deletedCount === 0)
    return res.status(404).send({ message: "Note not found" });

  res.send({ message: "Note deleted" });
});

// Update note
router.patch("/:id", authTodo, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { title: req.body.title, description: req.body.description } },
      { new: true }
    );

    if (!note) return res.status(404).send({ message: "Note not found" });
    res.send(note);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
});


module.exports = router;
