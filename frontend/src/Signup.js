import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function Signup() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post(`${API_URL}/api/auth/register/`, formData)

      .then(() => {
        alert("Registration successful");
      })

      .catch(() => {
        alert("Registration failed");
      });

  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>Signup</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button type="submit">
            Signup
          </button>

        </form>

      </div>

    </div>

  );
}

export default Signup;