import { useEffect, useRef, useState } from "react";
import { getChat } from "../../services/chatAPI";
import socket from "../../services/socket";

const ChatBox = ({ ride }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("user")).user;
  console.log("Current User:", currentUser);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.connect();
    socket.emit("join_booking", ride?.ride_id);

    const fetchMessages = async () => {
      try {
        const data = await getChat(ride?.ride_id, currentUser.id);
        setMessages(data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("receive_message", (msg) => {
      if (msg.ride_id === ride?.ride_id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [ride?.ride_id, currentUser.id]);

  useEffect(() => {
    scrollToBottom();
    console.log("Messages:", messages);
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      ride_id: ride?.ride_id,
      sender_id: currentUser.id,
      receiver_id: ride?.driver_id,
      message_text: text,
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
            key={msg.id}
            className={`flex ${
              msg.sender_id === currentUser.id ? "justify-end" : "justify-start"
            }`}
          >
            <div>
              <div className="text-xs text-gray-500 mb-1 ml-1">
                {msg.sender_id === currentUser.id
                  ? currentUser.name || "You"
                  : ride?.driver_first_name || "Driver"}
              </div>
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  msg.sender_id === currentUser.id
                    ? "bg-night-ink text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.message || msg.message_text}
              </div>
              <div className="text-xs text-gray-400 mt-1 text-right">
                {msg.sent_at
                  ? new Date(msg.sent_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
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
