import React, { useState } from "react";
import { toast } from "react-toastify";

const MoodForm = ({ onSave }) => {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) {
      toast.error("Please select a mood");
      return;
    }
    await onSave({ mood, note });
    setMood("");
    setNote("");
  };

  return (
    <div className="form-section">
      <h2>How do you feel today?</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setMood(e.target.value)} value={mood}>
          <option value="">Select mood</option>
          <option>Happy</option>
          <option>Sad</option>
          <option>Angry</option>
          <option>Meh</option>
        </select>
        <br />
        <textarea
          placeholder="Why so..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <br />
        <button type="submit">Save Mood</button>
      </form>
    </div>
  );
};

export default MoodForm;
