import { useEffect, useRef, useState } from "react";
import { getChat } from "../../services/chatAPI";
import socket from "../../services/socket";

const ChatBox = ({ bookingId, currentUserId, otherUserId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.connect();
    socket.emit("join_booking", bookingId);

    const fetchMessages = async () => {
      try {
        const data = await getChat(bookingId);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("receive_message", (msg) => {
      if (msg.booking_id === bookingId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      chat_id: Date.now(), // Using timestamp as a unique ID for simplicity
      booking_id: bookingId,
      sender_id: currentUserId,
      receiver_id: otherUserId,
      message: text,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", msg);
    setText("");
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <h3 className="text-base font-medium text-gray-700 mb-3">
        Message to Driver
      </h3>

      <div className="h-64 overflow-y-auto px-2 py-1 space-y-2 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.chat_id}
            className={`flex ${
              msg.sender_id === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                msg.sender_id === currentUserId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
