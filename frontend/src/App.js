import React, { useState } from "react";
import UserUI from "./UserUI";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [view, setView] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Ved Library System</h1>

      <button onClick={() => setView("user")}>User</button>
      <button onClick={() => setView("admin")}>Admin</button>

      {view === "user" && <UserUI />}

      {view === "admin" && (
        isLoggedIn ? (
          <div>
            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            <Dashboard />
          </div>
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} />
        )
      )}
    </div>
  );
}

export default App;