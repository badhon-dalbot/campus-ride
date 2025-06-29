import { useEffect, useRef, useState } from "react";
import { getChat } from "../../services/chatAPI";
import socket from "../../services/socket"; // Make sure you have this

export default function MessageBox({ ride }) {
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("user")).user;

  // Fetch messages and participants from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getChat(ride.ride_id, currentUser.id);
        setMessages(data.messages || []);
        setParticipants(data.participants || []);
      } catch (err) {
        setMessages([]);
        setParticipants([]);
      }
    };
    fetchMessages();

    // Listen for new messages via socket
    socket.on("receive_message", (msg) => {
      if (msg.ride_id === ride.ride_id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [ride.ride_id, currentUser.id]);

  const getSenderName = (sender_id) => {
    if (sender_id === currentUser.id) return "You";
    const user = participants.find((p) => p.id === sender_id);
    return user ? user.name : "Participant";
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      ride_id: ride.ride_id,
      message_text: inputValue,
      sender_id: currentUser.id,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    socket.emit("send_message", newMessage); // Send to server
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mt-4 bg-white border border-night-ink-50 p-3 rounded">
      <p className="text-sm font-medium mb-2">
        Chat with{" "}
        {participants
          .filter((p) => p.id !== currentUser.id)
          .map((p) => p.name)
          .join(", ") || "Participant"}
      </p>
      <div className="h-40 overflow-y-auto border border-gray-200 rounded p-2 mb-2 bg-gray-50 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={`flex ${
              msg.sender_id === currentUser.id ? "justify-end" : "justify-start"
            }`}
          >
            <div>
              <div className="text-xs text-gray-500 mb-1 ml-1">
                {getSenderName(msg.sender_id)}
              </div>
              <div
                className={`px-3 py-2 rounded-2xl max-w-xs text-sm ${
                  msg.sender_id === currentUser.id
                    ? "bg-night-ink text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text || msg.message || msg.message_text}
              </div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {msg.timestamp || msg.sent_at
                  ? new Date(msg.timestamp || msg.sent_at).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : ""}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-night-ink text-white px-3 py-1 text-sm rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
