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
    otp: ""
  });

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/bookings/`)
      .then(res => {
        const booked = res.data.map(b => b.seat);
        const allSeats = Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          booked: booked.includes(i + 1)
        }));
        setSeats(allSeats);
      });
  }, []);

  // 🔐 Send OTP
  const sendOTP = async () => {
    await axios.post(`${API_URL}/api/send-otp/`, {
      email: formData.email
    });
    alert("OTP sent to email");
  };

  // 🔐 Verify OTP
  const verifyOTP = async () => {
    const res = await axios.post(`${API_URL}/api/verify-otp/`, {
      email: formData.email,
      otp: formData.otp
    });

    if (res.data.verified) {
      setVerified(true);
      alert("OTP verified");
    } else {
      alert("Wrong OTP");
    }
  };

  // 💳 Payment
  const handlePayment = async () => {
    const res = await axios.post(`${API_URL}/api/payment/`);

    const options = {
      key: "YOUR_KEY",
      amount: res.data.amount,
      currency: "INR",
      name: "Ved Library",

      handler: async function () {
        await axios.post(`${API_URL}/api/book/`, {
          ...formData,
          seat: selectedSeat.id
        });

        alert("Booking Successful");
      }
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="max-w-4xl mx-auto p-5">

      <h1 className="text-3xl text-center mb-5 font-bold">
        Seat Booking
      </h1>

      <div className="grid grid-cols-10 gap-2">
        {seats.map(seat => (
          <div
            key={seat.id}
            onClick={() => !seat.booked && setSelectedSeat(seat)}
            className={`h-10 flex items-center justify-center text-white rounded cursor-pointer
            ${seat.booked ? "bg-red-500" : "bg-green-500"}`}
          >
            {seat.id}
          </div>
        ))}
      </div>

      {selectedSeat && (
        <div className="mt-5 bg-white p-5 shadow rounded">

          <input placeholder="Name" className="border p-2 w-full mb-2"
            onChange={(e)=>setFormData({...formData,name:e.target.value})}/>

          <input placeholder="Phone" className="border p-2 w-full mb-2"
            onChange={(e)=>setFormData({...formData,phone:e.target.value})}/>

          <input placeholder="Email" className="border p-2 w-full mb-2"
            onChange={(e)=>setFormData({...formData,email:e.target.value})}/>

          <button onClick={sendOTP} className="bg-blue-500 text-white w-full p-2 mb-2">
            Send OTP
          </button>

          <input placeholder="Enter OTP" className="border p-2 w-full mb-2"
            onChange={(e)=>setFormData({...formData,otp:e.target.value})}/>

          <button onClick={verifyOTP} className="bg-green-500 text-white w-full p-2 mb-2">
            Verify OTP
          </button>

          {verified && (
            <button onClick={handlePayment} className="bg-purple-600 text-white w-full p-2">
              Pay & Book
            </button>
          )}

        </div>
      )}
    </div>
  );
}

export default UserUI;