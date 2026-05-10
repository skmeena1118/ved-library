import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import "./App.css";

const API_URL = "https://ved-library.onrender.com";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bookings/`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
  }, []);

  const totalSeats = 100;
  const bookedSeats = bookings.length;
  const availableSeats = totalSeats - bookedSeats;
  const revenue = bookedSeats * 100;

  const lineData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 20 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 40 },
    { name: "Sat", value: 80 },
    { name: "Sun", value: 60 },
  ];

  const pieData = [
    { name: "Booked", value: bookedSeats },
    { name: "Available", value: availableSeats },
  ];

  const COLORS = ["#c2b3da", "#4499a8"];

  const handleDelete = (seat) => {
    axios
      .delete(`${API_URL}/api/delete/${seat}/`)
      .then(() => {
        setBookings(bookings.filter((b) => b.seat !== seat));
      });
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Ved Library</h2>

        <ul>
          <li className="active">Dashboard</li>
          <li>Bookings</li>
          <li>Revenue</li>
          <li>Students</li>
          <li>Analytics</li>
          <li>Payments</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Topbar */}
        <div className="topbar">
          <input
            type="text"
            placeholder="Search..."
            className="search-box"
          />

          <div className="profile">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="cards-grid">

          <div className="big-card">
            <h1>₹ {revenue}</h1>
            <p>Total Revenue</p>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#9984c8"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="small-card purple">
            <h2>{bookedSeats}</h2>
            <p>Booked Seats</p>
          </div>

          <div className="small-card blue">
            <h2>{availableSeats}</h2>
            <p>Available Seats</p>
          </div>

          <div className="small-card cyan">
            <h2>{totalSeats}</h2>
            <p>Total Seats</p>
          </div>

          <div className="small-card green">
            <h2>{bookings.length}</h2>
            <p>Total Users</p>
          </div>

        </div>

        {/* Bottom */}
        <div className="bottom-grid">

          <div className="chart-card">
            <h2>Seat Analytics</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="booking-card">
            <h2>Recent Bookings</h2>

            {bookings.map((b, i) => (
              <div className="booking-item" key={i}>

                <div>
                  <h3>Seat {b.seat}</h3>
                  <p>{b.name}</p>
                  <span>{b.phone}</span>
                </div>

                <button onClick={() => handleDelete(b.seat)}>
                  Delete
                </button>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;