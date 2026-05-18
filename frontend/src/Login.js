// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://1.1.1.1:8080/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error();

      navigate("/home");
    } catch {
      setError("Usuari o contrasenya incorrectes");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">MSW</div>
          <h2>Most Secure Web</h2>
          <p>La web més infranquejable del món</p>
        </div>

        <form onSubmit={handleLogin}>
          <label>Usuari</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Contrasenya</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="error">{error}</div>}

          <button type="submit">Iniciar sessió</button>
        </form>
      </div>
    </div>
  );
}
