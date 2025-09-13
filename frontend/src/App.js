import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoodForm from "./components/MoodForm";
import MoodList from "./components/MoodList";
import MoodChart from "./components/MoodChart";
import "./App.css";

function App() {
  const [moods, setMoods] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const navigate = useNavigate();

  const fetchMoods = useCallback(
    async (params = {}) => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const queryParams = new URLSearchParams(params).toString();
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/moods${
        queryParams ? `?${queryParams}` : ""
      }`;

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const data = await res.json();
        setMoods(data);
      } catch (error) {
        console.error("Error fetching moods:", error);
        toast.error("Failed to fetch moods.");
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchMoods(filterParams);
  }, [filterParams, fetchMoods]);

  const handleSaveMood = async ({ mood, note }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/moods`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mood, note }),
        }
      );
      if (res.ok) {
        toast.success("Mood saved!");
        fetchMoods(filterParams);
      } else {
        toast.error("Failed to save mood.");
      }
    } catch (error) {
      console.error("Error saving mood:", error);
      toast.error("Failed to save mood.");
    }
  };

  const handleDeleteMood = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/moods/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Mood deleted!");
      fetchMoods(filterParams);
    } catch (error) {
      console.error("Error deleting mood:", error);
      toast.error("Failed to delete mood.");
    }
  };

  const handleUpdateMood = async () => {
    fetchMoods(filterParams);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <header>
        <h1>MoodMater</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <div className="main-content">
        <div className="main-content-left">
          <MoodForm onSave={handleSaveMood} />
          <MoodList
            moods={moods}
            onDelete={handleDeleteMood}
            onUpdate={handleUpdateMood}
            onFilter={setFilterParams}
          />
        </div>
        <div className="main-content-right">
          <MoodChart moods={moods} />
        </div>
      </div>
    </div>
  );
}

export default App;
