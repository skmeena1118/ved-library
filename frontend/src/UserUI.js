import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://ved-library.onrender.com";

function UserUI() {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/`)
      .then(res => {
        const bookedSeats = res.data.map(b => b.seat);

        const allSeats = Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          booked: bookedSeats.includes(i + 1)
        }));

        setSeats(allSeats);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-5">
        📚 Seat Booking
      </h1>

      <div className="grid grid-cols-10 gap-2 justify-center">
        {seats.map(seat => (
          <div
            key={seat.id}
            onClick={() => !seat.booked && setSelectedSeat(seat)}
            className={`w-10 h-10 flex items-center justify-center rounded text-white cursor-pointer
            ${seat.booked ? "bg-red-500" : "bg-green-500 hover:bg-green-600"}`}
          >
            {seat.id}
          </div>
        ))}
      </div>

      {selectedSeat && (
        <div className="mt-6 bg-white shadow p-5 rounded text-center">

          <h2 className="text-xl font-semibold mb-3">
            Book Seat {selectedSeat.id}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="border p-2 w-full rounded"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full rounded"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              {loading ? "Booking..." : "Confirm"}
            </button>
          </form>

        </div>
      )}

    </div>
  );
}

export default UserUI;