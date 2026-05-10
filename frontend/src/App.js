import React, { useState } from "react";
import UserUI from "./UserUI";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [view, setView] = useState("user");

  return (
    <div>

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          Ved Library
        </div>

        <div className="nav-links">
          <button onClick={() => setView("user")}>
            Home
          </button>

          <button onClick={() => setView("dashboard")}>
            Dashboard
          </button>

          <button>Pricing</button>
          <button>About</button>
          <button>Contact</button>
        </div>

      </nav>

      {/* USER PAGE */}
      {view === "user" && (
        <>

          {/* Hero */}
          <div className="hero-section">

            <div className="hero-overlay">

              <h1>Smart Library Seat Booking</h1>

              <p>
                Modern online seat booking platform for students.
              </p>

              <div className="hero-buttons">

                <button className="primary-btn">
                  Book Now
                </button>

                <button className="secondary-btn">
                  Explore
                </button>

              </div>

            </div>

          </div>

          {/* Features */}
          <div className="features-section">

            <h2>Why Choose Ved Library?</h2>

            <div className="features-grid">

              <div className="feature-card">
                <h3>Online Booking</h3>
                <p>Book seats instantly.</p>
              </div>

              <div className="feature-card">
                <h3>Analytics</h3>
                <p>Track bookings and revenue.</p>
              </div>

              <div className="feature-card">
                <h3>Payments</h3>
                <p>Secure online payment system.</p>
              </div>

              <div className="feature-card">
                <h3>Dashboard</h3>
                <p>Professional admin dashboard.</p>
              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="stats-section">

            <div className="stat-box">
              <h1>100+</h1>
              <p>Seats</p>
            </div>

            <div className="stat-box">
              <h1>500+</h1>
              <p>Students</p>
            </div>

            <div className="stat-box">
              <h1>24/7</h1>
              <p>Booking</p>
            </div>

            <div className="stat-box">
              <h1>99%</h1>
              <p>Satisfaction</p>
            </div>

          </div>

          {/* Booking UI */}
          <UserUI />

          {/* Footer */}
          <footer className="footer">

            <div>
              <h2>Ved Library</h2>
              <p>Modern Seat Booking Platform</p>
            </div>

            <div>
              <p>Email: support@vedlibrary.com</p>
              <p>Phone: +91 9876543210</p>
            </div>

          </footer>

        </>
      )}

      {/* DASHBOARD */}
      {view === "dashboard" && <Dashboard />}

    </div>
  );
}

export default App;