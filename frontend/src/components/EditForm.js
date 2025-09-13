import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function EditForm({ moodToEdit, onUpdate, onCancel }) {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (moodToEdit) {
      setMood(moodToEdit.mood || "");
      setNote(moodToEdit.note || "");
    }
  }, [moodToEdit]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!moodToEdit) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found.");
        setIsSubmitting(false);
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

      const data = await res.json();

      if (res.ok) {
        toast.success("Mood updated successfully!");
        onUpdate(data);
      } else {
        toast.error(data.message || "Failed to update mood.");
      }
    } catch (error) {
      console.error("Error updating mood:", error);
      toast.error("Failed to update mood. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!moodToEdit) return null;

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h2>Edit Mood Entry</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="mood">Mood:</label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="">Select a mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="energetic">Energetic</option>
              <option value="calm">Calm</option>
              <option value="anxious">Anxious</option>
              <option value="excited">Excited</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="note">Notes:</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isSubmitting}
              rows="3"
              placeholder="Add any notes about your mood..."
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="update-btn"
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
