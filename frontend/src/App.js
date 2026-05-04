import React, { useState } from "react";
import UserUI from "./UserUI";
import Dashboard from "./Dashboard";
import Login from "./Login";
import "./App.css";

function App() {
  const [view, setView] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      {/* Navbar */}
      <div className="navbar">
        <h2>Ved Library</h2>
        <div>
          <button onClick={() => setView("user")}>User</button>
          <button onClick={() => setView("admin")}>Admin</button>
        </div>
      </div>

      <div className="content">
        {view === "user" && <UserUI />}

        {view === "admin" && (
          isLoggedIn ? (
            <div>
              <button className="logout" onClick={() => setIsLoggedIn(false)}>
                Logout
              </button>
              <Dashboard />
            </div>
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )
        )}
      </div>
    </div>
  );
}

export default App;