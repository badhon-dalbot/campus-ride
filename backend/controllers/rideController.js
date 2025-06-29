import db from "../config/db.js";

// create ride from driver
const createRide = async (req, res) => {
  console.log("Creating ride with data:", req.body);
  
  const { 
    creator_id, 
    creator_role, 
    from_location, 
    to_location, 
    ride_date, 
    ride_time, 
    seats_available,
    price_per_seat,
    pickup_description,
    notes,
    pickup_coordinate, 
    dropoff_coordinate,
    distance,
    seats_needed,
    is_shared
  } = req.body;

  if (!creator_id || !creator_role || !from_location || !to_location || !ride_date || !ride_time || !seats_available || !price_per_seat) {
    console.log("Missing required fields:", { creator_id, creator_role, from_location, to_location, ride_date, ride_time, seats_available, price_per_seat });
    return res.status(400).json({ error: "Missing required fields: creator_id, creator_role, from_location, to_location, ride_date, ride_time, seats_available, price_per_seat" });
  }

  // Validate that creator_role is 'driver'
  if (creator_role !== 'driver') {
    console.log("Invalid creator_role:", creator_role);
    return res.status(403).json({ error: "Only drivers can create rides" });
  }

  try {
    // Verify the user exists and is a driver
    const [userCheck] = await db.query(
      "SELECT id, role FROM users WHERE id = ? AND role = 'driver'",
      [creator_id]
    );

    if (userCheck.length === 0) {
      console.log("User not found or not authorized as driver:", creator_id);
      return res.status(403).json({ error: "User not found or not authorized as driver" });
    }

    console.log("User verified as driver:", userCheck[0]);

    // First, create the ride
    const [rideResult] = await db.query(
      `INSERT INTO rides (
        creator_id, 
        creator_role, 
        from_location, 
        to_location, 
        ride_date, 
        ride_time, 
        seats_available,
        price_per_seat,
        pickup_description,
        notes,
        pickup_coordinate, 
        dropoff_coordinate,
        distance,
        seats_needed,
        is_shared
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        creator_id, 
        creator_role, 
        from_location, 
        to_location, 
        ride_date, 
        ride_time, 
        seats_available,
        price_per_seat,
        pickup_description || null,
        notes || null,
        pickup_coordinate || null, 
        dropoff_coordinate || null,
        distance || null,
        seats_needed || seats_available,
        is_shared || "yes"
      ]
    );

    const rideId = rideResult.insertId;
    console.log("Ride created with ID:", rideId);

    // Calculate fare based on distance and price per seat
    let fareAmount = 0;
    if (distance && price_per_seat) {
      // Basic fare calculation: distance in km * price per seat
      const distanceInKm = distance / 1000; // Convert meters to kilometers
      fareAmount = distanceInKm * parseFloat(price_per_seat);
    } else {
      // Fallback: use price per seat as base fare
      fareAmount = parseFloat(price_per_seat);
    }

    console.log("Calculated fare amount:", fareAmount);

    // Create fare record
    await db.query(
      `INSERT INTO ride_fares (ride_id, fare_amount, calculated_at) VALUES (?, ?, NOW())`,
      [rideId, fareAmount]
    );

    console.log("Fare record created for ride:", rideId);

    res.status(201).json({
      message: "Ride created successfully",
      rideId: rideId,
      fareAmount: fareAmount,
      ride: {
        id: rideId,
        creator_id,
        creator_role,
        from_location,
        to_location,
        ride_date,
        ride_time,
        seats_available,
        price_per_seat,
        pickup_description,
        notes,
        pickup_coordinate,
        dropoff_coordinate,
        distance,
        seats_needed,
        is_shared
      }
    });
  } catch (error) {
    console.error("Error creating ride:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

const getRides = async (req, res) => {
  try {
    const [rides] = await db.query(
      "SELECT * FROM rides WHERE ride_date >= CURDATE()"
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

// get all available rides with driver info
const getAvailableRides = async (req, res) => {
  const query = `
  
  SELECT 
  r.id AS ride_id,
  r.from_location AS start_location,
  r.to_location AS destination,
  r.ride_date,
  r.ride_time,
  r.seats_available,
  r.pickup_description,
  u.id AS driver_id,
  u.first_name AS driver_first_name,
  u.last_name AS driver_last_name,
  COALESCE(AVG(rt.rating), 0) AS driver_rating,
  COUNT(rt.id) AS review_count
FROM 
  rides r
JOIN 
  users u ON r.creator_id = u.id
LEFT JOIN
  ratings rt ON rt.ratee_id = u.id
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
GROUP BY
  r.id, u.id
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
    const query = `SELECT 
      r.id AS ride_id,
      r.from_location AS start_location,
      r.to_location AS destination,
      r.ride_date,
      r.ride_time,
      r.seats_available,
      r.pickup_description,
      u.id AS driver_id,
      u.first_name AS driver_first_name,
      u.last_name AS driver_last_name,
      u.phone AS driver_phone,
      COALESCE(AVG(rt.rating), 0) AS driver_rating,
      COUNT(rt.id) AS review_count
    FROM rides r
    JOIN users u ON r.creator_id = u.id
    LEFT JOIN ratings rt ON rt.ratee_id = u.id
    WHERE r.id = ?
    GROUP BY r.id, u.id;
    `;

    const fareQuery = `SELECT 
      rf.fare_amount
    FROM ride_fares rf
    WHERE rf.ride_id = ?;
    `;
    const driverQuery = `SELECT 
  u.id AS driver_id,
  u.first_name,
  u.last_name,
  u.email,
  u.phone,
  v.license_plate,
  v.make,
  v.model,
  v.seats,
  v.fuel_type,
  v.last_maintenance
FROM rides r
JOIN users u ON r.creator_id = u.id
LEFT JOIN vehicles v ON u.id = v.driver_id
WHERE r.id = ?;


`;

    const [ride] = await db.query(query, [rideId]);
    if (!ride || ride.length === 0) {
      return res.status(404).json({ error: "Ride not found" });
    }

    const [fare] = await db.query(fareQuery, [rideId]);
    const [driverVehicle] = await db.query(driverQuery, [rideId]);

    res.json({
      ride: ride[0],
      fare: fare.length > 0 ? fare[0].fare_amount : null,
      driverVehicle: driverVehicle[0],
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
};

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
