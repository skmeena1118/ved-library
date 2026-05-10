import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://ved-library.onrender.com";

function UserUI() {

  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {

    axios.get(`${API_URL}/api/bookings/`)
      .then((res) => {

        const bookedSeats = res.data.map((b) => b.seat);

        const allSeats = Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          booked: bookedSeats.includes(i + 1),
        }));

        setSeats(allSeats);

      });

  }, []);

  const handleSeatClick = (seat) => {

    if (!seat.booked) {
      setSelectedSeat(seat);
    }

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    axios.post(`${API_URL}/api/book/`, {

      seat: selectedSeat.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,

    })

    .then(() => {

      alert("Seat booked successfully");

      setSeats(
        seats.map((s) =>
          s.id === selectedSeat.id
            ? { ...s, booked: true }
            : s
        )
      );

      setSelectedSeat(null);

      setFormData({
        name: "",
        phone: "",
        email: "",
      });

    });

  };

  return (

    <div className="booking-container">

      <h1 className="section-title">
        Choose Your Seat
      </h1>

      <div className="seat-grid">

        {seats.map((seat) => (

          <div
            key={seat.id}
            className={`seat ${
              seat.booked ? "booked" : "available"
            }`}
            onClick={() => handleSeatClick(seat)}
          >

            {seat.id}

          </div>

        ))}

      </div>

      {selectedSeat && (

        <div className="booking-form">

          <h2>
            Book Seat {selectedSeat.id}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <button type="submit">
              Confirm Booking
            </button>

          </form>

        </div>

      )}

    </div>

  );

}

export default UserUI;