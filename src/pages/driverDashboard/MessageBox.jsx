import { useEffect, useRef, useState } from "react";
export default function MessageBox({ ride }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "driver",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    // Scroll to the bottom of the message box
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="mt-4 bg-white border border-night-ink-50 p-3 rounded">
      <p className="text-sm font-medium mb-2">Chat with {ride.passenger}</p>
      <div className="h-32 overflow-y-auto border border-gray-200 rounded p-2 mb-2 bg-gray-50 text-sm">
        {messages.map((msg, idx) => (
          <p key={idx} className="mb-1">
            <span className="font-semibold">{msg.sender}:</span> {msg.text}
          </p>
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
