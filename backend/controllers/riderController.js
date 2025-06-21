import db from '../config/db.js';

const getRiderProfile = async (req, res) => {
  const riderId = req.params.id;

  try {
    const [rows] = await db.query(
      `SELECT 
        id AS riderId,
        firstName,
        lastName,
        email,
        phone,
        document,
        created_at
      FROM users
      WHERE id = ? AND role = 'rider'`,
      [riderId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Rider not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching rider profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { getRiderProfile };
