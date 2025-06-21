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
        d.rating,
        d.review_count,
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
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching driver profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { getDriverProfile };