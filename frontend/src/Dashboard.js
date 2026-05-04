import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://ved-library.onrender.com";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/`)
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalSeats = 100;
  const bookedSeats = bookings.length;
  const availableSeats = totalSeats - bookedSeats;

  const handleDelete = (seat) => {
    axios.delete(`${API_URL}/api/delete/${seat}/`)
      .then(() => {
        setBookings(bookings.filter(b => b.seat !== seat));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="dashboard">

      <h2>Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats">
        <div className="card total">
          <h3>Total</h3>
          <p>{totalSeats}</p>
        </div>

        <div className="card booked">
          <h3>Booked</h3>
          <p>{bookedSeats}</p>
        </div>

        <div className="card available">
          <h3>Available</h3>
          <p>{availableSeats}</p>
        </div>
      </div>

      {/* Booking List */}
      <div className="booking-list">
        <h3>Bookings</h3>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          <ul>
            {bookings.map((b, i) => (
              <li key={i}>
                Seat {b.seat}
                <button onClick={() => handleDelete(b.seat)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default Dashboard;