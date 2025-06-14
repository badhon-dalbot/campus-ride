import db from "../config/db.js";

const booking = async (req, res) => {
  try {
    const { userId } = req.params;

  
    const [rows] = await db.query(
      "SELECT * FROM bookings WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user." });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: error.message ||"Internal server error." });
  }
};

const createBooking = async (req, res) => {
  try {
    const { userId, bookingDetails } = req.body;

    if (!userId || !bookingDetails) {
      return res.status(400).json({ message: "User ID and booking details are required." });
    }

    const [result] = await db.query(
      "INSERT INTO bookings (user_id, details) VALUES (?, ?)",
      [userId, bookingDetails]
    );

    res.status(201).json({ message: "Booking created successfully.", bookingId: result.insertId });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: error.message || "Internal server error." });
  }
};

export {
  booking, 
  createBooking
};