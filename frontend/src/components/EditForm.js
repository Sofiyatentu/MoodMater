import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EditForm({ id, onUpdate, onClose }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoods = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/moods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setMood(data.mood);
      setNote(data.note);
    } catch (error) {
      toast.error("Failed to fetch mood for editing.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, [id, fetchMoods]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/moods/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mood: mood, note: note }),
      });
      toast.success("Mood updated!");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Failed to update mood.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form">
      <h2>Edit Mood</h2>
      <form onSubmit={handleSubmit}>
        <select value={mood} onChange={(e) => setMood(e.target.value)} required>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Meh">Meh</option>
        </select>
        <br />
        <textarea
          placeholder="Edit your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <br />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditForm;
