import db from "../config/db.js";

export default function chatSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_booking', (bookingId) => {
      socket.join(`booking_${bookingId}`);
    });

    socket.on('send_message', async (data) => {
      const { booking_id, sender_id, receiver_id, message } = data;
      try {
        const [result] = await db.query(
          `INSERT INTO chat (booking_id, sender_id, receiver_id, message) VALUES (?, ?, ?, ?)`,
          [booking_id, sender_id, receiver_id, message]
        );

        const msgData = {
          id: result.insertId,
          booking_id,
          sender_id,
          receiver_id,
          message,
          timestamp: new Date(),
        };

        // Send to both rider and driver in that booking
        io.to(`booking_${booking_id}`).emit('receive_message', msgData);
      } catch (err) {
        console.error(err);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}
