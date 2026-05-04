import React, { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-5 shadow rounded">

      <h2 className="text-xl mb-3">Admin Login</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white w-full py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  );
}

export default Login;