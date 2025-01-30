import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const token = localStorage.getItem("jwt");
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        setShowHome(true);
      }, 3000);
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              showHome ? (
                <Home />
              ) : (
                <p>Loading Home...</p>
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
