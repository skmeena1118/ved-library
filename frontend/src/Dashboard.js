import React, { useEffect, useState } from "react";
import axios from "axios";

// 👉 ADD THIS (your live backend URL)
const API_URL = "https://ved-library.onrender.com";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/`)
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error:", err));
  }, []);

  const totalSeats = 100;
  const bookedSeats = bookings.length;
  const availableSeats = totalSeats - bookedSeats;

  const handleDelete = (seat) => {
    axios.delete(`${API_URL}/api/delete/${seat}/`)
      .then(() => {
        setBookings(bookings.filter(b => b.seat !== seat));
      })
      .catch(err => console.error("Delete error:", err));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Total Seats: {totalSeats}</p>
      <p>Booked Seats: {bookedSeats}</p>
      <p>Available Seats: {availableSeats}</p>

      <h3>Bookings:</h3>
      <ul>
        {bookings.map((b, i) => (
          <li key={i}>
            Seat {b.seat}
            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleDelete(b.seat)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;