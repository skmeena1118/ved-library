import React, { useState } from "react";
import "./App.css";

function UserUI() {

  const [selectedSeat, setSelectedSeat] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [generatedOtp, setGeneratedOtp] = useState("");

  const [enteredOtp, setEnteredOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);

  const [bookedSeats, setBookedSeats] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    phone: "",
    file: null,
  });

  // Seats 101 → 165
  const seats = Array.from(
    { length: 65 },
    (_, i) => 101 + i
  );

  // Seat click
  const handleSeatClick = (seat) => {

    if (bookedSeats.includes(seat)) {

      alert("Seat already booked");

      return;

    }

    setSelectedSeat(seat);

    setShowForm(true);

  };

  // Send OTP
  const sendOtp = () => {

    if (!formData.phone) {

      alert("Please enter mobile number");

      return;

    }

    const otp = Math.floor(
      1000 + Math.random() * 9000
    );

    setGeneratedOtp(otp.toString());

    alert(`Your OTP is ${otp}`);

    setOtpSent(true);

  };

  // Verify OTP
  const verifyOtp = () => {

    if (enteredOtp === generatedOtp) {

      alert("OTP Verified Successfully");

      setOtpVerified(true);

    } else {

      alert("Invalid OTP");

    }

  };

  // Submit Booking
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!otpVerified) {

      alert("Please verify OTP first");

      return;

    }

    alert(
      `Seat ${selectedSeat} booked successfully`
    );

    setBookedSeats([
      ...bookedSeats,
      selectedSeat
    ]);

    setShowForm(false);

    setOtpSent(false);

    setOtpVerified(false);

    setEnteredOtp("");

    setFormData({
      name: "",
      email: "",
      studentId: "",
      phone: "",
      file: null,
    });

  };

  return (

    <div className="booking-wrapper">

      <h1 className="section-title">
        Available Seats
      </h1>

      <div className="seat-layout">

        {seats.map((seat) => (

          <div
            key={seat}
            className={`modern-seat ${
              bookedSeats.includes(seat)
                ? "seat-booked"
                : ""
            }`}
            onClick={() => handleSeatClick(seat)}
          >

            {seat}

          </div>

        ))}

      </div>

      {/* Popup Form */}
      {showForm && (

        <div className="popup-overlay">

          <div className="popup-form">

            <h2>
              Book Seat {selectedSeat}
            </h2>

            <p>
              Complete your booking details
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Student ID"
                required
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    studentId: e.target.value,
                  })
                }
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />

              {/* OTP Button */}
              <button
                type="button"
                className="otp-btn"
                onClick={sendOtp}
              >
                Send OTP
              </button>

              {/* OTP Input */}
              {otpSent && (

                <>

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={enteredOtp}
                    onChange={(e) =>
                      setEnteredOtp(
                        e.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className="verify-btn"
                    onClick={verifyOtp}
                  >
                    Verify OTP
                  </button>

                </>

              )}

              {/* File Upload */}
              <input
                type="file"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    file: e.target.files[0],
                  })
                }
              />

              {/* Success */}
              {otpVerified && (
                <p className="otp-success">
                  OTP Verified Successfully
                </p>
              )}

              <div className="popup-buttons">

                <button type="submit">
                  Confirm Booking
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {

                    setShowForm(false);

                    setOtpSent(false);

                    setOtpVerified(false);

                  }}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}

export default UserUI;