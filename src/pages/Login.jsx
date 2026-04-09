import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  setError("");
  setLoading(true);

  // Frontend validation
  if (!form.username.trim() || !form.password.trim()) {
    setError("Username and password are required");
    setLoading(false);
    return;
  }

  try {
    const res = await API.post("/login/", {
      username: form.username.trim(),
      password: form.password
    });

    // Store tokens
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    // Navigate to dashboard
    navigate("/dashboard");

  } catch (err) {
    // Always show friendly error message for login failure
    setError("Invalid username or password");

    // Optional: log backend error for debugging
    console.log("Login API error:", err.response?.data);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="bubbles">
        {Array.from({ length: 20 }).map((_, i) => <span key={i} className="bubble"></span>)}
      </div>

      <div className="auth-container">
        <h2>Login</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;