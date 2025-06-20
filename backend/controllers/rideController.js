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
    const [rides] = await db.query("SELECT * FROM rides");

    if (rides.length === 0) {
      return res.status(404).json({ message: "No rides found" });
    }

    res.status(200).json(rides);
  } catch (error) {
    console.error("Error fetching rides:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all available rides with driver info
const getAvailableRides = async (req, res) => {
  const query = `
  SELECT 
    r.id AS ride_id,
    r.start_location,
    r.destination,
    r.ride_date,
    r.ride_time,
    r.seats_available,
    r.pickup_description,
    u.firstName AS driver_first_name,
    u.lastName AS driver_last_name,
    d.rating AS driver_rating,
    d.review_count
  FROM 
    rides r
  JOIN 
    users u ON r.driver_id = u.id
  JOIN 
    driver d ON u.id = d.driver_id
  WHERE 
    u.role = 'driver'
  ORDER BY 
    r.ride_date, r.ride_time;
  `;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching available rides:", error);
    res.status(500).json({ message: "Failed to fetch available rides" });
  }
};

export { createRide, getAvailableRides, getRides };
