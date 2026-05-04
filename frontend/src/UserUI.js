import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://ved-library.onrender.com";

function UserUI() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  // Load seats
  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/`)
      .then(res => {
        const bookedSeats = res.data.map(b => b.seat);

        const allSeats = Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          booked: bookedSeats.includes(i + 1)
        }));

        setSeats(allSeats);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSeatClick = (seat) => {
    if (!seat.booked) {
      setSelectedSeat(seat);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    axios.post(`${API_URL}/api/book/`, {
      seat: selectedSeat.id,
      name: formData.name,
      phone: formData.phone
    })
    .then(() => {
      setSeats(seats.map(s =>
        s.id === selectedSeat.id ? { ...s, booked: true } : s
      ));
      setSelectedSeat(null);
      setFormData({ name: "", phone: "" });
      setLoading(false);
    })
    .catch(() => {
      alert("Seat already booked!");
      setLoading(false);
    });
  };

  return (
    <div className="user-container">

      {/* Header */}
      <div className="user-header">
        <h2>📚 Ved Library Booking</h2>
        <p>Choose your seat and book instantly</p>
      </div>

      {/* Stats */}
      <div className="user-stats">
        <div className="stat-card">
          <h3>Total Seats</h3>
          <p>100</p>
        </div>
        <div className="stat-card booked">
          <h3>Booked</h3>
          <p>{seats.filter(s => s.booked).length}</p>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="grid">
        {seats.map(seat => (
          <div
            key={seat.id}
            className={`seat ${seat.booked ? "booked" : "available"}`}
            onClick={() => handleSeatClick(seat)}
          >
            {seat.id}
          </div>
        ))}
      </div>

      {/* Booking Form */}
      {selectedSeat && (
        <div className="form-card">
          <h3>Book Seat {selectedSeat.id}</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Enter Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <button type="submit" disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}

export default UserUI;