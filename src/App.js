import React, { useState } from "react";
import BookingForm from "./BookingForm";
import MentorList from "./MentorList";

function App() {
  const [areaOfInterest, setAreaOfInterest] = useState("");

  return (
    <div>
      <h1>Mentor Booking System</h1>
      <BookingForm />
      <hr />
      <h2>Find Mentors</h2>
      <input
        type="text"
        value={areaOfInterest}
        onChange={(e) => setAreaOfInterest(e.target.value)}
        placeholder="Enter area of interest"
      />
      <MentorList areaOfInterest={areaOfInterest} />
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
