import React, { useState, useEffect } from "react";

const MentorList = ({ areaOfInterest }) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch(`/mentors?area_of_interest=${areaOfInterest}`)
      .then((response) => response.json())
      .then((data) => setMentors(data.mentors));
  }, [areaOfInterest]);

  return (
    <div>
      <h2>Available Mentors</h2>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id}>
            {mentor.name} - {mentor.is_premium ? "Premium" : "Standard"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
