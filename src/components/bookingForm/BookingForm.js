import React, { useState, useEffect } from "react";

const BookingForm = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [duration, setDuration] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    fetch("/mentors")
      .then((response) => response.json())
      .then((data) => setMentors(data.mentors));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      student_id: 1,
      mentor_id: selectedMentor,
      booking_time: bookingTime,
      duration,
    };

    fetch("/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Booking confirmed! Booking ID: ${data.booking_id}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Area of Interest:</label>
        <input
          type="text"
          value={areaOfInterest}
          onChange={(e) => setAreaOfInterest(e.target.value)}
        />
      </div>
      <div>
        <label>Choose Mentor:</label>
        <select
          value={selectedMentor}
          onChange={(e) => setSelectedMentor(e.target.value)}
        >
          {mentors
            .filter((mentor) =>
              mentor.areas_of_expertise.includes(areaOfInterest)
            )
            .map((mentor) => (
              <option key={mentor.id} value={mentor.id}>
                {mentor.name} - {mentor.is_premium ? "Premium" : "Standard"}
              </option>
            ))}
        </select>
      </div>
      <div>
        <label>Booking Time:</label>
        <input
          type="datetime-local"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button type="submit">Book Session</button>
    </form>
  );
};

export default BookingForm;
