import { useState } from "react";

import EditForm from "./EditForm";

const MoodList = ({ moods, onDelete, onUpdate, onFilter }) => {
  const [editId, setEditId] = useState(null);
  const [filterMood, setFilterMood] = useState("");
  const [filterNote, setFilterNote] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this mood?");
    if (!confirmDelete) return;
    await onDelete(id);
  };

  const applyFilters = () => {
    onFilter({
      mood: filterMood,
      note: filterNote,
      startDate: startDate,
      endDate: endDate,
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="mood-list">
      <header>
        <h2>Saved Moods</h2>
        <button onClick={toggleFilters} className="filter-toggle-btn">
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </header>

      {showFilters && (
        <div className="filters-section">
          <h3>Filter Options</h3>
          <div className="filter-row">
            <label htmlFor="mood-filter">Mood:</label>
            <select
              id="mood-filter"
              onChange={(e) => setFilterMood(e.target.value)}
              value={filterMood}
            >
              <option value="">All Moods</option>
              <option>Happy</option>
              <option>Sad</option>
              <option>Angry</option>
              <option>Meh</option>
            </select>
          </div>
          <div className="filter-row">
            <label htmlFor="note-filter">Note:</label>
            <input
              id="note-filter"
              type="text"
              value={filterNote}
              placeholder="Filter by note..."
              onChange={(e) => setFilterNote(e.target.value)}
            />
          </div>
          <div className="filter-row">
            <label htmlFor="start-date">Start Date:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="filter-row">
            <label htmlFor="end-date">End Date:</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button onClick={applyFilters}>Apply Filters</button>
        </div>
      )}

      {moods.map((item) => (
        <div key={item._id} className="mood-card">
          <h3>{item.mood}</h3>
          <p>{item.note}</p>
          <p>{new Date(item.date).toLocaleString()}</p>
          <div className="actions">
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <button onClick={() => setEditId(item._id)}>Edit</button>
          </div>
        </div>
      ))}
      {editId && (
        <EditForm
          id={editId}
          onUpdate={onUpdate}
          onClose={() => setEditId(null)}
        />
      )}
    </div>
  );
};

export default MoodList;
