import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS; // from .env

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASS) {
      localStorage.setItem("isAdmin", "true"); // store admin login
      navigate("/admin");
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Owner Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
