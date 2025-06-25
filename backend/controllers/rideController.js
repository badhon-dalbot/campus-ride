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
    u.id AS driver_id,
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
    AND r.seats_available > 0
    AND (
      r.ride_date > CURDATE() 
      OR (
        r.ride_date = CURDATE() 
        AND r.ride_time > CURTIME()
      )
    )
  ORDER BY 
    r.ride_date ASC, r.ride_time ASC;
  `;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching available rides:", error);
    res.status(500).json({ message: "Failed to fetch available rides" });
  }
};

const getRideById = async (req, res) => {
  const rideId = req.params.id;
  try {
    const query = "SELECT * FROM rides WHERE id = ?";
    const [rows] = await db.query(query, [rideId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

// controllers/rideController.js
const getDriverRides = async (req, res) => {
  const driverId = req.params.id; // /api/rides/driver/:id

  try {
    const [rows] = await db.query(
  `
  SELECT
      r.id                 AS ride_id,
      r.start_location,
      r.destination,
      r.ride_date,
      r.ride_time,
      r.pickup_description,
      r.seats_available,

      b.id                 AS booking_id,
      b.status             AS booking_status,
      b.booking_time,
      b.pickup_location,
      b.dropoff_location,

      u.id                 AS passenger_id,
      CONCAT(u.firstName,' ',u.lastName) AS passenger_name,
      u.phone              AS passenger_phone
      -- add u.avatar, u.institution here **only if those columns exist**

  FROM rides r
  LEFT JOIN booking b
         ON b.ride_id = r.id
        AND b.status IN ('confirmed','pending')
  LEFT JOIN users u
         ON u.id = b.user_id
  WHERE r.driver_id = ?
  ORDER BY r.id, b.booking_time;
  `,
  [driverId]
);


    // group by ride
    const rides = {};
    rows.forEach((row) => {
      const id = row.ride_id;
      if (!rides[id]) {
        rides[id] = {
          ride_id: id,
          start_location: row.start_location,
          destination: row.destination,
          ride_date: row.ride_date,
          ride_time: row.ride_time,
          pickup_description: row.pickup_description,
          seats_available: row.seats_available,
          passengers: [],
        };
      }

      // only push passenger if there is a booking_id (LEFT JOIN may be null)
      if (row.booking_id) {
        rides[id].passengers.push({
          booking_id: row.booking_id,
          user_id: row.passenger_id,
          name: row.passenger_name,
          phone: row.passenger_phone,
          institution: row.institution,
          avatar: row.avatar,
          pickup_location: row.pickup_location,
          dropoff_location: row.dropoff_location,
          status: row.booking_status,
          booking_time: row.booking_time,
        });
      }
    });

    res.json(Object.values(rides)); // [] if no rides
  } catch (err) {
    console.error("getDriverRides error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export { createRide, getAvailableRides, getDriverRides, getRideById, getRides };
