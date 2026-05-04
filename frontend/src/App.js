import logo from "./logo.svg";
import "./App.css";
import Home from "./Home.js";
import Login from "./Login.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ---------------- APP ROUTER ----------------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
