const express = require("express");
const cors = require("cors");
const e = require("express");
const app = express();
const { Pool } = require("pg");

const host = "localhost";
const port = 8000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "eventdb",
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Root endpoint to check server status
app.get("/", (req, res) => {
  const status = {
    status: "ok",
    message: "The server is working fine",
  };
  res.json(status);
});

// Endpoint to get all attendees
app.get("/data", async (req, res) => {
  try {
    const allAttendees = await pool.query(
      "SELECT * FROM attendees ORDER BY id ASC "
    );
    res.status(200).json(allAttendees.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Endpoint to add new attendee
app.post("/data", async (req, res) => {
  try {
    const { firstname, lastname, gender, age, weight, height } = req.body;
    const newAttendee = await pool.query(
      `INSERT INTO attendees (firstname, lastname, gender, age, weight, height)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [firstname, lastname, gender, age, weight, height]
    );
    console.log("Added new Attendee with ID:", newAttendee.rows[0].id);
    res.status(200).json(newAttendee.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAttendee = await pool.query(
      `DELETE FROM attendees WHERE id = $1`,
      [id]
    );
    res.status(200).send("Attendee deleted successfully!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, (req, res) => {
  console.log(`The server is running at http://${host}:${port}`);
});
