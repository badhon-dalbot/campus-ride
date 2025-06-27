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
       FROM rider WHERE rider_id = ?`,
      [riderId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Rider not found" });
    }
    const prefs = rows[0];
    res.status(200).json({
      musicAllowed: prefs.allow_music === "Yes",
      gender: prefs.gender,
      friendlyChat: prefs.allow_talk === "Yes",
      smoking: prefs.allow_smoking === "Yes",
      seatPref: prefs.seat,
      flexibleTiming: prefs.flexible_timing === "Yes",
      quietRides: prefs.quiet_rides === "Yes",
      earlyPickup: prefs.early_pickup === "Yes",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
};

// Update rider preferences
const updateRiderPreferences = async (req, res) => {
  const riderId = req.params.id;
  const {
    musicAllowed,
    quietRides,
    friendlyChat,
    earlyPickup,
    flexibleTiming,
  } = req.body;
  try {
    await db.query(
      `UPDATE rider SET music = ?, quiet_rides = ?, allow_talk = ?, early_pickup = ?, flexible_timing = ?
       WHERE rider_id = ?`,
      [
        musicAllowed ? "Yes" : "No",
        quietRides ? "Yes" : "No",
        friendlyChat ? "Yes" : "No",
        earlyPickup ? "Yes" : "No",
        flexibleTiming ? "Yes" : "No",
        riderId,
      ]
    );
    res.status(200).json({ message: "Preferences updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update preferences" });
  }
};

export {
  getRiderPreferences,
  getRiderProfile,
  updateRiderBio,
  updateRiderPreferences,
};
