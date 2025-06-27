import db from "../config/db.js";

const getDriverProfile = async (req, res) => {
  const driverId = req.params.id;

  try {
    const [rows] = await db.query(
      `SELECT 
        u.id AS driverId,
        u.firstName,
        u.lastName,
        u.email,
        u.phone,
        u.document,
        u.created_at,
        u.about,
        u.account_status,
        d.rating,
        d.review_count,
        d.one_star,
        d.two_star,
        d.three_star,
        d.four_star,
        d.five_star,
        d.music,
        d.pet,
        d.smoking,
        d.quietRide,
        v.make,
        v.model,
        v.license_no,
        v.fuel_type,
        v.color,
        v.seats,
        v.last_maintenance
      FROM users u
      JOIN driver d ON u.id = d.driver_id
      LEFT JOIN vehicle v ON d.driver_id = v.driver_id
      WHERE u.id = ?`,
      [driverId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching driver profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updatePreferences = async (req, res) => {
  const driverId = req.params.id;
  const { music, pet, smoking, quietRide } = req.body;
  try {
    await db.query(
      "UPDATE driver SET music = ?, pet = ?, smoking = ?, quietRide = ? WHERE driver_id = ?",
      [music, pet, smoking, quietRide, driverId]
    );

    res.status(200).json({ message: "Preferences updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update preferences" });
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
  const { make, model, color, licensePlate, seats, fuelType, lastMaintenance } = req.body;

  try {
    // Check if vehicle record exists for this driver
    const [existingVehicle] = await db.query(
      "SELECT vehicle_id FROM vehicle WHERE driver_id = ?",
      [driverId]
    );

    if (existingVehicle.length > 0) {
      // Update existing vehicle record
      await db.query(
        `UPDATE vehicle SET 
         make = ?, 
         model = ?, 
         color = ?, 
         license_no = ?, 
         seats = ?, 
         fuel_type = ?, 
         last_maintenance = ? 
         WHERE driver_id = ?`,
        [make, model, color, licensePlate, seats, fuelType, lastMaintenance, driverId]
      );
    } else {
      // Insert new vehicle record
      await db.query(
        `INSERT INTO vehicle 
         (driver_id, make, model, color, license_no, seats, fuel_type, last_maintenance) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [driverId, make, model, color, licensePlate, seats, fuelType, lastMaintenance]
      );
    }

    res.status(200).json({ message: "Vehicle information updated successfully" });
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

    // 3. Pending requests
    const [pendingRequests] = await db.query(
      `
     SELECT 
    b.id AS booking_id,
    u.first_name AS rider_first_name,
    u.last_name AS rider_last_name,
    u.phone AS rider_phone,
    r.from_location,
    r.to_location,
    r.ride_date,
    r.ride_time,
    b.seats_booked,
    b.status,
    b.booked_at
FROM bookings b
JOIN rides r ON b.ride_id = r.id
JOIN users u ON b.rider_id = u.id
WHERE r.driver_id = ?  -- Replace with current driver ID
  AND b.status = 'pending'
ORDER BY b.booked_at DESC;

    `,
      [driverId]
    );

    // 4. Accepted requests
    const [acceptedRequests] = await db.query(
      `
      SELECT 
    b.id AS booking_id,
    u.first_name AS rider_first_name,
    u.last_name AS rider_last_name,
    u.phone AS rider_phone,
    r.from_location,
    r.to_location,
    r.ride_date,
    r.ride_time,
    b.seats_booked,
    b.status,
    b.booked_at,
    b.fare
FROM bookings b
JOIN rides r ON b.ride_id = r.id
JOIN users u ON b.rider_id = u.id
WHERE r.driver_id = ? -- replace with actual driver_id
  AND b.status = 'accepted'
ORDER BY b.booked_at DESC;

    `,
      [driverId]
    );

    res.json({
      summary: summaryRows[0],
      vehicle: vehicleRows[0] || null,
      upcomingRides,
      pendingRequests,
      acceptedRequests,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export {
  getDriverDashboard,
  getDriverProfile,
  updateDriverBio,
  updatePreferences,
  updateVehicleInfo,
};
