import db from "../config/db.js";

const getDriverProfile = async (req, res) => {
  const driverId = req.params.id;

  try {
    const [profile] = await db.query(
      `
  SELECT 
    u.id AS driverId,
    u.first_name AS firstName,
    u.last_name AS lastName,
    u.email,
    u.phone,
    u.document_path,
    u.created_at AS since,
    u.about,
    u.account_status,

    (
      SELECT COUNT(*) 
      FROM ratings 
      WHERE ratee_id = u.id 
        AND comment IS NOT NULL 
        AND TRIM(comment) <> ''
    ) AS reviewCount,

    AVG(r.rating) AS averageRating,
    SUM(r.rating = 1) AS one_star,
    SUM(r.rating = 2) AS two_star,
    SUM(r.rating = 3) AS three_star,
    SUM(r.rating = 4) AS four_star,
    SUM(r.rating = 5) AS five_star,

    v.make,
    v.model,
    v.license_plate,
    v.fuel_type,
    v.color,
    v.seats,
    v.last_maintenance

  FROM users u
  LEFT JOIN ratings r ON u.id = r.ratee_id
  LEFT JOIN vehicles v ON u.id = v.driver_id
  WHERE u.id = ?
  GROUP BY u.id;
  `,
      [driverId]
    );

    const [comments] = await db.query(
      `
  SELECT 
    r.id AS ratingId,
    r.rater_id AS reviewerId,
    CONCAT(ru.first_name, ' ', ru.last_name) AS reviewerName,
    ru.email AS reviewerEmail,
    ru.document_path AS reviewerAvatar,
    r.rating,
    r.comment,
    r.created_at
  FROM ratings r
  JOIN users ru ON r.rater_id = ru.id
  WHERE r.ratee_id = ?
    AND r.comment IS NOT NULL 
    AND TRIM(r.comment) <> ''
  ORDER BY r.created_at DESC;
  `,
      [driverId]
    );

    if (profile.length === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json({
      ...profile[0],
      reviews: comments,
    });
  } catch (error) {
    console.error("Error fetching driver profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/driver/:id/preferences
const getDriverPreferences = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.query(
      `SELECT allow_music, allow_pets, allow_smoking, quiet_rides, max_passengers
       FROM user_preferences WHERE user_id = ?`,
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    res.json({
      musicAllowed: !!rows[0].allow_music,
      petsAllowed: !!rows[0].allow_pets,
      smokingAllowed: !!rows[0].allow_smoking,
      quietRides: !!rows[0].quiet_rides,
      maxPassengers: rows[0].max_passengers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT /api/driver/:id/preferences
const updateDriverPreferences = async (req, res) => {
  const userId = req.params.id;
  const {
    musicAllowed,
    petsAllowed,
    smokingAllowed,
    quietRides,
    maxPassengers,
  } = req.body;

  try {
    // Check if preferences exist for user
    const [rows] = await db.query(
      `SELECT * FROM user_preferences WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      // Insert new preferences row
      await db.query(
        `INSERT INTO user_preferences
         (user_id, allow_music, allow_pets, allow_smoking, quiet_rides, max_passengers)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          musicAllowed ? 1 : 0,
          petsAllowed ? 1 : 0,
          smokingAllowed ? 1 : 0,
          quietRides ? 1 : 0,
          maxPassengers || 4, // Default to 4 if not set
        ]
      );
    } else {
      // Update existing preferences row
      await db.query(
        `UPDATE user_preferences SET
          allow_music = ?,
          allow_pets = ?,
          allow_smoking = ?,
          quiet_rides = ?,
          max_passengers = ?
         WHERE user_id = ?`,
        [
          musicAllowed ? 1 : 0,
          petsAllowed ? 1 : 0,
          smokingAllowed ? 1 : 0,
          quietRides ? 1 : 0,
          maxPassengers || 4, // Default to 4 if not set
          userId,
        ]
      );
    }

    // Return updated preferences
    res.json({
      message: "Preferences updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateDriverBio = async (req, res) => {
  const driverId = req.params.id;
  const { about } = req.body;
  if (!about) {
    return res.status(400).json({ error: "Bio (about) is required" });
  }
  try {
    const [result] = await db.query("UPDATE users SET about = ? WHERE id = ?", [
      about,
      driverId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json({ message: "Bio updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update bio" });
  }
};

const updateVehicleInfo = async (req, res) => {
  const driverId = req.params.id;
  const { make, model, color, licensePlate, seats, fuelType, lastMaintenance } =
    req.body;

  try {
    // Check if vehicle record exists for this driver
    const [existingVehicle] = await db.query(
      "SELECT id FROM vehicles WHERE driver_id = ?",
      [driverId]
    );

    if (existingVehicle.length > 0) {
      // Update existing vehicle record
      await db.query(
        `UPDATE vehicles SET 
         make = ?, 
         model = ?, 
         color = ?, 
         license_plate = ?, 
         seats = ?, 
         fuel_type = ?, 
         last_maintenance = ? 
         WHERE driver_id = ?`,
        [
          make,
          model,
          color,
          licensePlate,
          seats,
          fuelType,
          lastMaintenance,
          driverId,
        ]
      );
    } else {
      // Insert new vehicle record
      await db.query(
        `INSERT INTO vehicles
         (driver_id, make, model, color, license_plate, seats, fuel_type, last_maintenance) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          driverId,
          make,
          model,
          color,
          licensePlate,
          seats,
          fuelType,
          lastMaintenance,
        ]
      );
    }

    res
      .status(200)
      .json({ message: "Vehicle information updated successfully" });
  } catch (error) {
    console.error("Error updating vehicle info:", error);
    res.status(500).json({ error: "Failed to update vehicle information" });
  }
};

const getDriverDashboard = async (req, res) => {
  const driverId = req.params.id;
  if (!driverId) return res.status(400).json({ error: "Invalid driver ID" });

  try {
    // 1. Summary - Fixed to work with actual database schema
    const [summaryRows] = await db.query(
      `
      SELECT
        u.id AS driver_id,
        CONCAT(u.first_name, ' ', u.last_name) AS driver_name,
        
        COALESCE(SUM(p.amount), 0) AS total_earnings,
        COALESCE(AVG(rt.rating), 0) AS average_rating,
        
        (SELECT COUNT(*) FROM rides WHERE creator_id = u.id) AS total_trips,
        
        (SELECT COUNT(*)
         FROM ride_requests rr
         JOIN rides r ON rr.ride_id = r.id
         WHERE r.creator_id = u.id) AS total_ride_requests,
        
        (SELECT COUNT(*)
         FROM ride_requests rr
         JOIN rides r ON rr.ride_id = r.id
         WHERE r.creator_id = u.id AND rr.status = 'accepted') AS active_ride_requests,
        
        (SELECT COUNT(*)
         FROM ride_requests rr
         JOIN rides r ON rr.ride_id = r.id
         WHERE r.creator_id = u.id AND rr.status = 'pending') AS pending_ride_requests,
        
        (SELECT COUNT(*)
         FROM bookings b
         JOIN rides r ON b.ride_id = r.id
         WHERE r.creator_id = u.id) AS total_bookings,
        
        (SELECT COALESCE(SUM(rf.fare_amount), 0)
         FROM ride_fares rf
         JOIN rides r ON rf.ride_id = r.id
         WHERE r.creator_id = u.id) AS total_fares

      FROM users u
      LEFT JOIN rides r ON r.creator_id = u.id
      LEFT JOIN ride_requests rr ON rr.ride_id = r.id
      LEFT JOIN bookings b ON b.ride_id = r.id
      LEFT JOIN payments p ON p.booking_id = b.id
      LEFT JOIN ratings rt ON rt.ratee_id = u.id
      WHERE u.id = ?
      GROUP BY u.id;
      `,
      [driverId]
    );

    // Vehicle info
    const [vehicleRows] = await db.query(
      `SELECT * FROM vehicles WHERE driver_id = ? LIMIT 1;`,
      [driverId]
    );

    // 2. Upcoming rides - Fixed to include all necessary fields
    const [upcomingRides] = await db.query(
      `
      SELECT 
        r.id AS ride_id,
        r.from_location,
        r.to_location,
        r.ride_date,
        r.ride_time,
        r.seats_available,
        r.price_per_seat,
        r.notes,
        r.pickup_description,
        r.distance,
        r.seats_needed,
        r.is_shared,
        COUNT(rr.id) AS pending_requests
      FROM rides r
      LEFT JOIN ride_requests rr ON rr.ride_id = r.id AND rr.status = 'pending'
      WHERE r.creator_id = ?
        AND r.ride_date >= CURDATE()
      GROUP BY r.id
      ORDER BY r.ride_date, r.ride_time;
      `,
      [driverId]
    );

    // 3. Get pending requests count for quick actions
    const [pendingRequestsResult] = await db.query(
      `
      SELECT COUNT(*) AS pending_count
      FROM ride_requests rr
      JOIN rides r ON rr.ride_id = r.id
      WHERE r.creator_id = ? AND rr.status = 'pending'
      `,
      [driverId]
    );

    // 4. Get recent earnings data for the chart
    const [recentEarnings] = await db.query(
      `
      SELECT 
        DATE(p.created_at) AS date,
        COUNT(b.id) AS rides,
        SUM(p.amount) AS amount
      FROM payments p
      JOIN bookings b ON p.booking_id = b.id
      JOIN rides r ON b.ride_id = r.id
      WHERE r.creator_id = ?
        AND p.payment_status = 'completed'
        AND p.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(p.created_at)
      ORDER BY date DESC
      LIMIT 7
      `,
      [driverId]
    );

    // 5. Calculate response time (average time between ride creation and first booking)
    const [responseTimeResult] = await db.query(
      `
      SELECT AVG(TIMESTAMPDIFF(MINUTE, r.created_at, b.created_at)) AS avg_response_time
      FROM rides r
      JOIN bookings b ON r.id = b.ride_id
      WHERE r.creator_id = ?
        AND b.created_at > r.created_at
      `,
      [driverId]
    );

    const responseTime = responseTimeResult[0]?.avg_response_time
      ? Math.round(responseTimeResult[0].avg_response_time)
      : 15; // Default 15 minutes

    res.json({
      summary: summaryRows[0] || {
        driver_id: driverId,
        driver_name: "Driver",
        total_earnings: 0,
        average_rating: 0,
        total_trips: 0,
        total_ride_requests: 0,
        active_ride_requests: 0,
        pending_ride_requests: 0,
        total_bookings: 0,
        total_fares: 0,
      },
      vehicle: vehicleRows[0] || null,
      upcomingRides: upcomingRides || [],
      pendingRequests: pendingRequestsResult[0]?.pending_count || 0,
      recentEarnings: recentEarnings || [],
      responseTime: responseTime,
    });
  } catch (err) {
    console.error("Error in getDriverDashboard:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getTotalTrips = async (req, res) => {
  const { driverId } = req.params;
  console.log("Driver ID:", driverId);

  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS total_trips
       FROM rides
       WHERE creator_id = ?`,
      [driverId]
    );

    res.json(rows[0]); // { total_trips: 24 }
  } catch (error) {
    console.error("Error fetching total trips:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRideRequests = async (req, res) => {
  const driverId = req.params.driverId;

  const [rows] = await db.query(
    `
    SELECT rr.id AS request_id,
           rr.status,
           rr.requested_at,
           rr.seats,
           r.id AS ride_id,
           r.from_location,
           r.to_location,
           r.ride_date,
           r.ride_time,
           r.price_per_seat,
           u.id AS rider_id,
           CONCAT(u.first_name, ' ', u.last_name) AS rider_name,
           u.email,
           u.phone,
           (
             SELECT ROUND(AVG(rating), 2)
             FROM ratings
             WHERE ratee_id = u.id
           ) AS rider_rating
    FROM ride_requests rr
    JOIN rides r ON rr.ride_id = r.id
    JOIN users u ON rr.rider_id = u.id
    WHERE r.creator_id = ? AND rr.status = 'pending'
    ORDER BY rr.requested_at DESC
    `,
    [driverId]
  );

  res.json(rows);
};

const getAcceptedRides = async (req, res) => {
  const driverId = req.params.driverId;

  const [rows] = await db.query(
    `
    SELECT rr.id AS request_id,
           rr.requested_at,
           rr.seats,
           r.id AS ride_id,
           r.from_location,
           r.to_location,
           r.ride_date,
           r.ride_time,
           r.price_per_seat,
           u.id AS rider_id,
           CONCAT(u.first_name, ' ', u.last_name) AS rider_name,
           u.email,
           u.phone,
           (
             SELECT ROUND(AVG(rating), 2)
             FROM ratings
             WHERE ratee_id = u.id
           ) AS rider_rating
    FROM ride_requests rr
    JOIN rides r ON rr.ride_id = r.id
    JOIN users u ON rr.rider_id = u.id
    WHERE r.creator_id = ? AND rr.status = 'accepted'
    ORDER BY r.ride_date ASC, r.ride_time ASC
    `,
    [driverId]
  );

  res.json(rows);
};

// PATCH /api/ride-request/:id
const updateRideRequest = async (req, res) => {
  const { status } = req.body; // 'accepted' or 'rejected'
  const requestId = req.params.id;

  await db.query(`UPDATE ride_requests SET status = ? WHERE id = ?`, [
    status,
    requestId,
  ]);

  res.json({ message: `Ride request ${status}` });
};

// Create a new ride request
const createRideRequest = async (req, res) => {
  const { ride_id, rider_id, seats = 1 } = req.body;

  if (!ride_id || !rider_id) {
    return res.status(400).json({ error: "Ride ID and rider ID are required" });
  }

  try {
    // Check if ride request already exists
    const [existingRequest] = await db.query(
      "SELECT * FROM ride_requests WHERE ride_id = ? AND rider_id = ?",
      [ride_id, rider_id]
    );

    if (existingRequest.length > 0) {
      return res.status(409).json({ error: "Ride request already exists" });
    }

    // Create new ride request with seats
    const [result] = await db.query(
      "INSERT INTO ride_requests (ride_id, rider_id, seats, status) VALUES (?, ?, ?, 'pending')",
      [ride_id, rider_id, seats]
    );

    res.status(201).json({
      message: "Ride request created successfully",
      requestId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating ride request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get ride request by ID
const getRideRequestById = async (req, res) => {
  const requestId = req.params.id;

  try {
    const [rows] = await db.query(
      `
      SELECT rr.id AS request_id,
             rr.status,
             rr.requested_at,
             r.id AS ride_id,
             r.from_location,
             r.to_location,
             r.ride_date,
             r.ride_time,
             u.id AS rider_id,
             CONCAT(u.first_name, ' ', u.last_name) AS rider_name,
             u.email,
             u.phone
      FROM ride_requests rr
      JOIN rides r ON rr.ride_id = r.id
      JOIN users u ON rr.rider_id = u.id
      WHERE rr.id = ?
    `,
      [requestId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Ride request not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching ride request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  createRideRequest,
  getAcceptedRides,
  getDriverDashboard,
  getDriverPreferences,
  getDriverProfile,
  getRideRequestById,
  getRideRequests,
  getTotalTrips,
  updateDriverBio,
  updateDriverPreferences,
  updateRideRequest,
  updateVehicleInfo,
};
