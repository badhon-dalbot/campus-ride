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
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching driver profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updatePreferences = async (req, res) => {
  const driverId = req.params.id;
  const { music, pet, smoking, quietRide } = req.body;
  try {
    await db.query(
      'UPDATE driver SET music = ?, pet = ?, smoking = ?, quietRide = ? WHERE driver_id = ?',
      [music, pet, smoking, quietRide, driverId]
    );
    
    res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

const updateDriverBio = async (req, res) => {
  const driverId = req.params.id;
  const { about } = req.body;
  if (!about) {
    return res.status(400).json({ error: 'Bio (about) is required' });
  }
  try {
    const [result] = await db.query(
      'UPDATE users SET about = ? WHERE id = ?',
      [about, driverId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.status(200).json({ message: 'Bio updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bio' });
  }
};

export { getDriverProfile, updatePreferences, updateDriverBio };