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
  const driverId = +req.params.id;
  if (!driverId) return res.status(400).json({ error: "Invalid driver ID" });

  try {
    // 1. Summary
    const [summaryRows] = await db.query(
      `
      SELECT
        COALESCE(SUM(p.amount), 0) AS total_earnings,
        d.rating,
        (SELECT COUNT(*) FROM rides WHERE driver_id = ?) AS total_trips,
        (SELECT COUNT(*) FROM booking b JOIN rides r ON b.ride_id = r.id WHERE r.driver_id = ?) AS total_ride_requests
      FROM payment p
      JOIN booking b ON p.booking_id = b.id
      JOIN rides r ON b.ride_id = r.id
      JOIN driver d ON r.driver_id = d.driver_id
      WHERE r.driver_id = ? AND b.status IN ('accepted', 'confirmed');
    `,
      [driverId, driverId, driverId]
    );

    // Vehicle info
    const [vehicleRows] = await db.query(
      `SELECT * FROM vehicle WHERE driver_id = ? LIMIT 1`,
      [driverId]
    );

    // 2. Upcoming rides
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
    r.notes
FROM rides r
WHERE r.driver_id = ?
  AND r.ride_date >= CURDATE()
ORDER BY r.ride_date, r.ride_time;

    `,
      [driverId]
    );

    res.json({
      summary: summaryRows[0],
      vehicle: vehicleRows[0] || null,
      upcomingRides,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getTotalTrips = async (req, res) => {
  const driverId = req.params.id;

  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS total_trips
       FROM rides
       WHERE driver_id = ? AND status = 'completed'`,
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

export {
  getAcceptedRides,
  getDriverDashboard,
  getDriverPreferences,
  getDriverProfile,
  getRideRequests,
  getTotalTrips,
  updateDriverBio,
  updateDriverPreferences,
  updateRideRequest,
  updateVehicleInfo,
};
