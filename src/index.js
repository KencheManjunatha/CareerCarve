const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
const db = new sqlite3.Database(":memory:");

// Create tables for mentors, students, and bookings
db.serialize(() => {
  db.run(`CREATE TABLE mentors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        availability TEXT,
        areas_of_expertise TEXT,
        is_premium BOOLEAN
    )`);

  db.run(`CREATE TABLE students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        availability TEXT,
        area_of_interest TEXT
    )`);

  db.run(`CREATE TABLE bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        mentor_id INTEGER,
        session_time TEXT,
        FOREIGN KEY(student_id) REFERENCES students(id),
        FOREIGN KEY(mentor_id) REFERENCES mentors(id)
    )`);
});

// Routes
app.get("/", (req, res) => {
  res.send("Mentor Booking API");
});

// Get all mentors
app.get("/mentors", (req, res) => {
  const { area_of_expertise } = req.query;
  const query = area_of_expertise
    ? `SELECT * FROM mentors WHERE areas_of_expertise LIKE ?`
    : `SELECT * FROM mentors`;

  const params = area_of_expertise ? [`%${area_of_expertise}%`] : [];

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ mentors: rows });
  });
});

// Create a booking
app.post("/bookings", (req, res) => {
  const { student_id, mentor_id, session_time } = req.body;
  db.run(
    `INSERT INTO bookings (student_id, mentor_id, session_time) VALUES (?, ?, ?)`,
    [student_id, mentor_id, session_time],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ booking_id: this.lastID });
    }
  );
});

// Get bookings by student or mentor ID
app.get("/bookings", (req, res) => {
  const { student_id, mentor_id } = req.query;
  let query = "SELECT * FROM bookings WHERE ";
  const params = [];

  if (student_id) {
    query += "student_id = ?";
    params.push(student_id);
  } else if (mentor_id) {
    query += "mentor_id = ?";
    params.push(mentor_id);
  } else {
    return res
      .status(400)
      .json({ error: "Please provide a student_id or mentor_id" });
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ bookings: rows });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
