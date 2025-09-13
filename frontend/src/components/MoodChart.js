import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const MoodChart = ({ moods }) => {
  const getMoodCounts = () => {
    const counts = {};
    moods.forEach((item) => {
      counts[item.mood] = (counts[item.mood] || 0) + 1;
    });
    return Object.entries(counts).map(([mood, count]) => ({ mood, count }));
  };

  const moodCounts = getMoodCounts();
  const colors = ["#ffbb28", "#ff8042", "#00C49F", "#0088FE"];

  return (
    <div className="chart-container">
      <div className="chart">
        <h3>Mood Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={moodCounts}
              dataKey="count"
              nameKey="mood"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {moodCounts.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart">
        <h3>Mood Frequency</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moodCounts}>
            <XAxis dataKey="mood" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodChart;
