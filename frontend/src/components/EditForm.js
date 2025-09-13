import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function EditForm({ moodToEdit, onUpdate, fetchMoods }) {
  const [mood, setMood] = useState(moodToEdit.mood);
  const [note, setNote] = useState(moodToEdit.note);

  useEffect(() => {
    setMood(moodToEdit.mood);
    setNote(moodToEdit.note);
  }, [moodToEdit]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/moods/${moodToEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mood, note }),
        }
      );

      if (res.ok) {
        toast.success("Mood updated!");
        onUpdate();
      } else {
        toast.error("Failed to update mood.");
      }
    } catch (error) {
      console.error("Error updating mood:", error);
      toast.error("Failed to update mood.");
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={mood} onChange={(e) => setMood(e.target.value)} required />
      <input value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditForm;
