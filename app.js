const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Thought = require("./models/Thought");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/social_network");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes

// Users routes
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/thoughts", async (req, res) => {
  try {
    const thoughts = await User.find().populate("thoughts").populate("friends");
    console.log(thoughts);
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/thoughts/:id", async (req, res) => {
  try {
    const thoughts = await Thought.findById(req.params.id)
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/thoughts", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
