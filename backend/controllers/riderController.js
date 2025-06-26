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
        about,
        account_status,
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

const updateRiderBio = async (req, res) => {
  const riderId = req.params.id;
  const { about } = req.body;
  if (!about) {
    return res.status(400).json({ error: 'Bio (about) is required' });
  }
  try {
    const [result] = await db.query(
      'UPDATE users SET about = ? WHERE id = ?',
      [about, riderId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    res.status(200).json({ message: 'Bio updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bio' });
  }
};

// Get rider preferences
const getRiderPreferences = async (req, res) => {
  const riderId = req.params.id;
  try {
    const [rows] = await db.query(
      `SELECT music, quietRide, conversation, early_pickup, flexible_timing
       FROM rider WHERE rider_id = ?`,
      [riderId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Rider not found' });
    }
    const prefs = rows[0];
    res.status(200).json({
      musicAllowed: prefs.music === 'Yes',
      quietRides: prefs.quietRide === 'Yes',
      friendlyChat: prefs.conversation === 'Yes',
      earlyPickup: prefs.early_pickup === 'Yes',
      flexibleTiming: prefs.flexible_timing === 'Yes',
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
};

// Update rider preferences
const updateRiderPreferences = async (req, res) => {
  const riderId = req.params.id;
  const { musicAllowed, quietRides, friendlyChat, earlyPickup, flexibleTiming } = req.body;
  try {
    await db.query(
      `UPDATE rider SET music = ?, quietRide = ?, conversation = ?, early_pickup = ?, flexible_timing = ?
       WHERE rider_id = ?`,
      [
        musicAllowed ? 'Yes' : 'No',
        quietRides ? 'Yes' : 'No',
        friendlyChat ? 'Yes' : 'No',
        earlyPickup ? 'Yes' : 'No',
        flexibleTiming ? 'Yes' : 'No',
        riderId
      ]
    );
    res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

export { getRiderProfile, updateRiderBio, getRiderPreferences, updateRiderPreferences };
