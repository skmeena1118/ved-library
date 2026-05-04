import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://ved-library.onrender.com";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/`)
      .then(res => setBookings(res.data));
  }, []);

  const handleDelete = (seat) => {
    axios.delete(`${API_URL}/api/delete/${seat}/`)
      .then(() => {
        setBookings(bookings.filter(b => b.seat !== seat));
      });
  };

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-blue-500 text-white p-4 rounded">
          Total: 100
        </div>
        <div className="bg-red-500 text-white p-4 rounded">
          Booked: {bookings.length}
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          Available: {100 - bookings.length}
        </div>
      </div>

      <ul className="space-y-2">
        {bookings.map((b, i) => (
          <li key={i} className="flex justify-between bg-gray-100 p-3 rounded">
            Seat {b.seat}
            <button
              onClick={() => handleDelete(b.seat)}
              className="bg-red-500 text-white px-2 rounded"
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