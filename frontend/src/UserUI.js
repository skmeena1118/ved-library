import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// 👉 ADD THIS LINE (your live backend)
const API_URL = "https://ved-library.onrender.com";

function UserUI() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });

  // Load booked seats from backend
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
      .catch(err => {
        console.error("Error fetching bookings:", err);
      });
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
    })
    .catch(() => {
      alert("Seat already booked!");
    });
  };

  return (
    <div>
      <h1>Ved Library Seat Booking</h1>
      <p>Total Booked: {seats.filter(s => s.booked).length}</p>

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

      {selectedSeat && (
        <div className="form">
          <h2>Book Seat {selectedSeat.id}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <button type="submit">Confirm</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserUI;