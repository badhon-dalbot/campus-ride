import db from "../config/db.js";

const getRiderProfile = async (req, res) => {
  const riderId = req.params.id;

  try {
    const [rows] = await db.query(
      `SELECT 
        id AS riderId,
        first_name AS firstName,
        last_name AS lastName,
        email,
        phone,
        document_path,
        about,
        account_status AS status,
        created_at
      FROM users
      WHERE id = ? AND role = 'rider'`,
      [riderId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Rider not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching rider profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateRiderBio = async (req, res) => {
  const riderId = req.params.id;
  const { about } = req.body;
  if (!about) {
    return res.status(400).json({ error: "Bio (about) is required" });
  }
  try {
    const [result] = await db.query("UPDATE users SET about = ? WHERE id = ?", [
      about,
      riderId,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Rider not found" });
    }
    res.status(200).json({ message: "Bio updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update bio" });
  }
};

// Get rider preferences
const getRiderPreferences = async (req, res) => {
  const riderId = req.params.id;
  try {
    const [rows] = await db.query(
      `SELECT*
       FROM user_preferences WHERE user_id = ?`,
      [riderId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Rider not found" });
    }
    const prefs = rows[0];
    console.log(prefs);
    res.status(200).json({
      musicAllowed: !!prefs.allow_music,
      friendlyChat: !!prefs.allow_talk,
      flexibleTiming: !!prefs.flexible_timing,
      quietRides: !!prefs.quiet_rides,
      earlyPickup: !!prefs.early_pickup,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
};

// Update rider preferences
const updateRiderPreferences = async (req, res) => {
  const riderId = req.params.id;
  const prefs = req.body;
  console.log(prefs);
  console.log("rider", riderId);
  try {
    await db.query(
      `UPDATE user_preferences SET allow_music = ?,allow_talk = ?,flexible_timing = ?, quiet_rides = ?,  early_pickup = ? 
       WHERE user_id = ?`,
      [
        prefs.musicAllowed ? 1 : 0,
        prefs.friendlyChat ? 1 : 0,
        prefs.quietRides ? 1 : 0,

        prefs.earlyPickup ? 1 : 0,
        prefs.flexibleTiming ? 1 : 0,
        riderId,
      ]
    );
    res.status(200).json({ message: "Preferences updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update preferences", message: err.message });
  }
};

export {
  getRiderPreferences,
  getRiderProfile,
  updateRiderBio,
  updateRiderPreferences,
};
