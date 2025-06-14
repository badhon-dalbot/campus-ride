import db from "../config/db.js";

const payments = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM payments WHERE user_id = ?",
      [bookingId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "No payments found for this user." });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: error.message || "Internal server error." });
  }
}

const createPayment = async (req, res) => {
  try {
    const { bookingId, amount, status } = req.body;

    if (!bookingId || !amount || !status) {
      return res.status(400).json({ message: "Booking id, amount and status are required." });
    }

    const [result] = await db.query(
      "INSERT INTO payments (user_id, details) VALUES (?, ?, ?)",
      [bookingId, amount, status]
    );

    res.status(201).json({ message: "Payment created successfully.", paymentId: result.insertId });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: error.message || "Internal server error." });
  }
}

export { payments, createPayment };