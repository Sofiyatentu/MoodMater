import express from "express";
import { Mood } from "../models/Mood.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const { mood, note, startDate, endDate } = req.query;
  const filter = { userId: req.user.id };

  if (mood) filter.mood = mood;
  if (note) filter.note = { $regex: note, $options: "i" };
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) {
      const nextDay = new Date(endDate);
      nextDay.setHours(23, 59, 59, 999);
      filter.date.$lte = nextDay;
    }
  }
  const moods = await Mood.find(filter).sort({ date: -1 });
  res.status(200).json(moods);
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const mood = await Mood.findById(id);
    if (!mood) return res.status(404).json({ message: "Mood not found" });
    if (mood.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });
    res.status(200).json(mood);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { mood, note } = req.body;
  const userId = req.user.id;
  const moodEntry = new Mood({ mood, note, userId });
  await moodEntry.save();
  res.status(201).json({ message: "Mood saved!" });
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const mood = await Mood.findById(id);
  if (!mood) return res.status(403).json({ message: "Mood not found" });
  if (mood.userId.toString() != req.user.id)
    return res.status(404).json({ message: "Unauthorised" });
  await mood.deleteOne();
  res.status(200).json({ message: "Mood deleted" });
});

router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const updatemood = await Mood.findById(id);
  if (!updatemood) return res.status(403).json({ message: "Mood not found" });
  if (updatemood.userId.toString() != req.user.id)
    return res.status(404).json({ message: "Unauthorised" });
  updatemood.mood = req.body.mood;
  updatemood.note = req.body.note;
  await updatemood.save();
  res.status(200).json(updatemood);
});

export default router;
