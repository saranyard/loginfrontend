// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // We'll create this CSS

function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard/");

        // Expect backend to return user info
        setMessage(res.data.message || "Welcome!");
        setUser(res.data.user || { username: "User" });
      } catch {
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.post("/logout/", {
        refresh: localStorage.getItem("refresh"),
      });

      localStorage.clear();
      navigate("/");
    } catch {
      console.log("Logout failed");
    }
  };

  return (
    <div className="dashboard">
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="bubble"></span>
        ))}
      </div>

      <div className="dashboard-content">
        <h1>Welcome, {user?.username} 👋</h1>
        <p>{message}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;