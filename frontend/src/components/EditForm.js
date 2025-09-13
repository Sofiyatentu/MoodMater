import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function EditForm({ moodToEdit, onUpdate }) {
  // Correctly define all state variables
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  // Use useEffect to update state when a mood is selected for editing
  // The dependency array [moodToEdit] ensures this runs only when the prop changes
  useEffect(() => {
    if (moodToEdit) {
      setMood(moodToEdit.mood || "");
      setNote(moodToEdit.note || "");
    }
  }, [moodToEdit]); // Correctly add the dependency array

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!moodToEdit) return;

    try {
      // Get the token from localStorage or your state management
      // This is a common method, but adjust if your app handles tokens differently
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }

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

  if (!moodToEdit) return null;

  return (
    <form onSubmit={handleUpdate}>
      <input value={mood} onChange={(e) => setMood(e.target.value)} required />
      <input value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditForm;
