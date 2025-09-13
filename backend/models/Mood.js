import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  mood: String,
  note: String,
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Mood = mongoose.model("Mood", moodSchema);
