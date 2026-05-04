// Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/me", { credentials: "include" })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/");
          return null;
        }
        return res.json();
      })
      .then((data) => data && setUser(data))
      .catch(() => navigate("/"));

    fetch("http://localhost:8080/posts", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [navigate]);

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="home-container">
      <div className="header">
        <div className="logo-small">MSW</div>
        <div>
          Hola, {user.username}
          <button className="logout-btn" onClick={handleLogout}>
            Tancar sessió
          </button>
        </div>
      </div>

      <div className="content">
        {/* TWO COLUMN USER INFO + TOKEN */}
        <div className="user-info-row">
          {/* USER DETAILS */}
          <div className="profile user-details-centered">
            <div className="avatar">{user.username[0]}</div>
            <div>
              <strong>{user.username}</strong>
            </div>
            <div>{user.email}</div>
            <div>ID: {user.id}</div>
            <div className={user.role == "admin" ? "role-admin" : "role-user"}>
              {user.role}
            </div>
          </div>

          {/* TOKEN */}
          <div className="token-box token-right">{user.token}</div>
        </div>

        {/* POSTS LIST */}
        <div className="posts">
          <h2 className="posts-title">Posts</h2>

          {posts.map((p) => (
            <div key={p.id} className="post-card">
              <div className="post-title">{p.title}</div>
              <div className="post-content">{p.content}</div>
              <div className="post-meta">
                <span>ID: {p.id}</span>
                <span>Author: {p.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
