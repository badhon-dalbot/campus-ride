import db from "../config/db.js"; 
// Get chat messages between two users
const message = async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await db.query(
      `SELECT * FROM chat 
       WHERE (sender_id = ? AND receiver_id = ?) 
          OR (sender_id = ? AND receiver_id = ?)
       ORDER BY timestamp ASC`,
      [user1, user2, user2, user1]
    );
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Send a chat message
const sendMessage = async (req, res) => {
  const { sender_id, receiver_id, message } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO chat (sender_id, receiver_id, message, timestamp) VALUES (?, ?, ?, NOW())',
      [sender_id, receiver_id, message]
    );
    res.json({ id: result.insertId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default {
  message,
  sendMessage
};
