import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

import "./App.css";

const API_URL = "https://ved-library.onrender.com";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/`)
      .then(res => setBookings(res.data));
  }, []);

  const totalSeats = 100;
  const bookedSeats = bookings.length;
  const availableSeats = totalSeats - bookedSeats;
  const revenue = bookedSeats * 100;

  const chartData = [
    { name: "Booked", value: bookedSeats },
    { name: "Available", value: availableSeats }
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  const handleDelete = (seat) => {
    axios.delete(`${API_URL}/api/delete/${seat}/`)
      .then(() => {
        setBookings(bookings.filter(b => b.seat !== seat));
      });
  };

  return (
    <div className="dashboard">

      <div className="cards">

        <div className="card blue">
          <h2>Total Seats</h2>
          <h1>{totalSeats}</h1>
        </div>

        <div className="card red">
          <h2>Booked</h2>
          <h1>{bookedSeats}</h1>
        </div>

        <div className="card green">
          <h2>Revenue</h2>
          <h1>₹ {revenue}</h1>
        </div>

      </div>

      <div className="chart-box">
        <h2>Seat Analytics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="booking-box">
        <h2>Bookings</h2>

        {bookings.map((b, i) => (
          <div className="booking-item" key={i}>

            <div>
              <h3>Seat {b.seat}</h3>
              <p>{b.name}</p>
              <p>{b.phone}</p>
            </div>

            <button onClick={() => handleDelete(b.seat)}>
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;