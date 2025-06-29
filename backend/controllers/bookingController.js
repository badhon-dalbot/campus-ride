import db from "../config/db.js";

const booking = async (req, res) => {
  try {
    const { userId, ridesId } = req.params;

    const [rows] = await db.query(
      `SELECT 
    booking.id AS id,
    users.firstName,
    users.lastName,
    users.email,
    rides.start_location,
    rides.destination,
    rides.ride_date,
    rides.ride_time,
    booking.status,
    booking.booking_time
  FROM booking
  JOIN users ON booking.user_id = users.id
  JOIN rides ON booking.ride_id = rides.id
  WHERE booking.user_id = ? AND booking.ride_id = ?
  ORDER BY booking.booking_time DESC`,
      [userId, ridesId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal server error." });
  }
};

const createBooking = async (req, res) => {
  try {
    const { ride_id, rider_id, seats_booked = 1 } = req.body;

    if (!ride_id || !rider_id) {
      return res
        .status(400)
        .json({ message: "ride_id and rider_id are required." });
    }

    const [result] = await db.query(
      `INSERT INTO bookings (ride_id, rider_id, seats_booked, status)
       VALUES (?, ?, ?, ?)`,
      [ride_id, rider_id, seats_booked, "accepted"]
    );

    res.status(201).json({
      message: "Booking created successfully.",
      bookingId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res
      .status(500)
      .json({ message: error.message || "Internal server error." });
  }
};

export { booking, createBooking };
