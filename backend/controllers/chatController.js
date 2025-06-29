import db from "../config/db.js";

// const message = async (req, res) => {
//   const { user1, user2 } = req.params;
//   try {
//     const messages = await db.query(
//       `SELECT * FROM chat
//        WHERE (sender_id = ? AND receiver_id = ?)
//           OR (sender_id = ? AND receiver_id = ?)
//        ORDER BY timestamp ASC`,
//       [user1, user2, user2, user1]
//     );
//     res.json(messages);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };
const getChat = async (req, res) => {
  const { rideId, userId } = req.params;
  try {
    const [messages] = await db.query(
      `SELECT * FROM messages 
       WHERE ride_id = ? 
         AND sender_id = ? 
       ORDER BY sent_at ASC`,
      [rideId, userId]
    );

    res.json(messages); // Always return as { messages: [...] }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export { getChat };
