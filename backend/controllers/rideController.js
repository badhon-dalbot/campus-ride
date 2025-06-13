import db from "../config/db.js"; 

// create ride from driver 
const createRide = async (req, res) => {
  const { startLocation, endLocation, date, availableSeats } = req.body;
  const driverId = req.user.id;

  if (!driverId || !startLocation || !endLocation || !date || !availableSeats) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO rides (user_id, start_location, end_location, date, time, price) VALUES (?, ?, ?, ?, ?, ?)",
      [driverId, startLocation, endLocation, date, availableSeats]
    );

    res.status(201).json({
      message: "Ride created successfully",
      rideId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

const getRides = async (req, res) => {
 
  try {
    const [rides] = await db.query(
      "SELECT * FROM ride"
    );

    if (rides.length === 0) {
      return res.status(404).json({ message: "No rides found" });
    }

    res.status(200).json(rides);
  } catch (error) {
    console.error("Error fetching rides:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {createRide, getRides};