import React, { useState } from "react";
import UserUI from "./UserUI";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [view, setView] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>

      {/* Navbar */}
      <div className="bg-slate-800 text-white flex justify-between px-6 py-4">
        <h2 className="text-xl font-bold">Ved Library</h2>

        <div className="space-x-3">
          <button onClick={() => setView("user")} className="bg-blue-500 px-3 py-1 rounded">
            User
          </button>

          <button onClick={() => setView("admin")} className="bg-green-500 px-3 py-1 rounded">
            Admin
          </button>
        </div>
      </div>

      <div className="p-5">

        {view === "user" && <UserUI />}

        {view === "admin" && (
          isLoggedIn ? (
            <div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded mb-3"
                onClick={() => setIsLoggedIn(false)}
              >
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