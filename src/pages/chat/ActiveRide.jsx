import {
  Car,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Share,
  Star,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getChat } from "../../services/chatAPI";
import socket from "../../services/socket";

const ActiveRide = ({ ride, userRole, onSendMessage, bookingId }) => {
  const [activeRidePanels, setActiveRidePanels] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [unread, setUnread] = useState(0);
  const scrollRef = useRef(null);

  const user = localStorage.getItem("user");
  const currentUser = user ? JSON.parse(user).user.id : null; // Get driver ID from local storage

  /* --------------------------------------------------------------
   |  1.  Helper: pluralisation & role‑specific header text         |
   -------------------------------------------------------------- */
  const getRoleSpecificText = () => {
    if (userRole === "driver") {
      const list = Array.isArray(ride.passengers) ? ride.passengers : [];
      const pickedUp = list.filter((p) => p.status === "picked_up").length;
      const waiting = list.filter(
        (p) => p.status !== "picked_up" && p.status !== "cancelled"
      ).length;

      const plural = (n) => (n === 1 ? "passenger" : "passengers");

      let statusTitle = "No passengers yet";
      if (waiting && pickedUp) {
        statusTitle = `${pickedUp} ${plural(
          pickedUp
        )} on board • ${waiting} ${plural(waiting)} waiting`;
      } else if (waiting) {
        statusTitle = `${waiting} ${plural(waiting)} waiting for pickup`;
      } else if (pickedUp) {
        statusTitle = `${pickedUp} ${plural(pickedUp)} on board`;
      }

      return {
        statusTitle,
        statusSubtitle: ride.route?.nextStop
          ? `Next stop: ${ride.route.nextStop}`
          : undefined,
        sectionTitle: "Passengers",
        callButtonText: "Call Passenger",
        trackButtonText: "Track Route",
        infoLabel: "Passenger Information",
      };
    }

    return {
      statusTitle: "Your Ride is Active",
      statusSubtitle: ride.route?.eta
        ? `Driver arriving in ${ride.route.eta}`
        : undefined,
      sectionTitle: "Your Driver",
      callButtonText: "Call Driver",
      trackButtonText: "Track Driver",
      infoLabel: "Driver Information",
    };
  };

  const roleText = getRoleSpecificText();

  /* --------------------------------------------------------------
   |  2.  Quick messages & send handler                            |
   -------------------------------------------------------------- */
  const quickMessages = [
    "I'm here at pickup",
    "Running 5 min late",
    "Where are you?",
    "On my way",
    "Thank you!",
  ];

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      chat_id: Date.now(), // Using timestamp as a unique ID for simplicity
      booking_id: bookingId,
      sender_id: currentUser,
      receiver_id: ride.passengers[0]?.user_id,
      message: text,
      timestamp: new Date().toISOString(),
    };

    socket.emit("send_message", msg);
    setText("");
  };

  /* --------------------------------------------------------------
   |  3.  Panel toggling                                           |
   -------------------------------------------------------------- */
  const toggleRidePanel = (panelType) => {
    setActiveRidePanels((prev) => ({
      ...prev,
      [panelType]: !prev[panelType],
      messages: panelType === "messages" ? !prev.messages : false,
      callInfo: panelType === "callInfo" ? !prev.callInfo : false,
      tracking: panelType === "tracking" ? !prev.tracking : false,
      shareTrip: panelType === "shareTrip" ? !prev.shareTrip : false,
    }));

    // reset unread badge when chat opens
    if (panelType === "messages") setUnread(0);
  };

  /* --------------------------------------------------------------
   |  4.  Simple unread badge demo (adds +1 whenever ride.messages
   |      grows while chat panel is closed). Replace with
   |      Socket.IO listener in production.                        |
   -------------------------------------------------------------- */
  const msgCount = ride.messages?.length || 0;
  const prevCount = useRef(msgCount);
  useEffect(() => {
    if (!activeRidePanels.messages && msgCount > prevCount.current) {
      setUnread((u) => u + (msgCount - prevCount.current));
    }
    prevCount.current = msgCount;
  }, [msgCount, activeRidePanels.messages]);

  /* --------------------------------------------------------------
   |  5.  Clipboard helper                                         |
   -------------------------------------------------------------- */
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  /* --------------------------------------------------------------
    |  6.  Chatting                                                 |
   -------------------------------------------------------------- */

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

  /* --------------------------------------------------------------
   |  7.  Render                                                   |
   -------------------------------------------------------------- */
  return (
    <div
      style={{ backgroundColor: "#D7E5E5" }}
      className="rounded-xl border border-gray-300 shadow-sm"
    >
      {/* ------------ Header ------------- */}
      <div
        className="text-white p-6 rounded-t-xl"
        style={{ backgroundColor: "#17252A" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">{roleText.statusTitle}</h2>
              {roleText.statusSubtitle && (
                <p className="text-gray-200">{roleText.statusSubtitle}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              ৳{ride?.route?.fare || 150}
            </div>
            <div className="text-gray-200 text-sm">{ride.ride_id}</div>
          </div>
        </div>
      </div>

      {/* ------------ Body ------------- */}
      <div className="p-6">
        {/* Top grid (route & contact) */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Trip route */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Trip Route</h3>
            <div className="space-y-4">
              {/* Pickup */}
              <div className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#17252A" }}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {ride.start_location}
                  </div>
                  <div className="text-sm text-gray-500">{ride.ride_time}</div>
                </div>
                <span
                  className="text-white px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "#17252A" }}
                >
                  ETA: {ride.route?.eta || 3} min
                </span>
              </div>
              {/* Destination */}
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {ride.destination}
                  </div>
                  <div className="text-sm text-gray-500">
                    {ride.route?.estimatedArrival}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / passengers */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {roleText.sectionTitle}
            </h3>

            {/* Driver view → list passengers */}
            {userRole === "driver" && ride.passengers ? (
              <div className="space-y-3">
                {ride.passengers.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#DEEEED" }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {p.avatar && (
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <User />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {p.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {p.institution}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          p.status === "picked_up"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {p.status === "picked_up" ? "On board" : "Waiting"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {p.pickupLocation} → {p.dropoffLocation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* Passenger view → show driver */
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#DEEEED" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={ride.contact.avatar}
                    alt={ride.contact.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {ride.contact.name}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{ride.contact.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {ride.contact.car}
                    </div>
                    <div className="text-sm text-gray-500 font-mono">
                      {ride.contact.licensePlate}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <ButtonPrimary
            icon={Phone}
            onClick={() => toggleRidePanel("callInfo")}
          >
            {roleText.callButtonText}
          </ButtonPrimary>

          <ButtonPrimary
            icon={MessageCircle}
            onClick={() => toggleRidePanel("messages")}
            badge={unread}
          >
            Messages
          </ButtonPrimary>

          <ButtonPrimary
            icon={Navigation}
            onClick={() => toggleRidePanel("tracking")}
          >
            {roleText.trackButtonText}
          </ButtonPrimary>
          <ButtonPrimary
            icon={Share}
            onClick={() => toggleRidePanel("shareTrip")}
          >
            Share Trip
          </ButtonPrimary>
        </div>

        {/* ---------------- Panels ---------------- */}
        {activeRidePanels.messages && (
          <ChatPanel
            messages={messages}
            userRole={userRole}
            quickMessages={quickMessages}
            message={text}
            setMessage={setText}
            onSend={sendMessage}
            scrollRef={scrollRef}
          />
        )}
        {activeRidePanels.callInfo && (
          <CallInfoPanel
            userRole={userRole}
            ride={ride}
            copyToClipboard={copyToClipboard}
          />
        )}
        {activeRidePanels.tracking && (
          <TrackingPanel ride={ride} userRole={userRole} />
        )}
        {activeRidePanels.shareTrip && (
          <ShareTripPanel ride={ride} copyToClipboard={copyToClipboard} />
        )}
      </div>
    </div>
  );
};

/* --------------------------------------------------------------
 |  7.  Reusable sub‑components (Button & Panels)                 |
 -------------------------------------------------------------- */

const ButtonPrimary = ({ icon: Icon, children, onClick, badge }) => (
  <button
    onClick={onClick}
    className="relative flex items-center justify-center gap-2 p-3 text-white rounded-lg hover:opacity-90 transition-colors"
    style={{ backgroundColor: "#17252A" }}
  >
    <Icon className="w-4 h-4" />
    <span className="font-medium">{children}</span>
    {badge > 0 && (
      <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

/* --- ChatPanel (scrollable history + input) --- */
const ChatPanel = ({
  messages = [],
  userRole,
  quickMessages,
  message,
  setMessage,
  onSend,
  scrollRef,
}) => (
  <div className="border-t border-gray-300 pt-6">
    <h4 className="font-semibold text-gray-900 mb-4">
      Messages {userRole === "driver" ? "(Group Chat)" : ""}
    </h4>
    <div
      ref={scrollRef}
      className="rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"
      style={{ backgroundColor: "#DEEEED" }}
    >
      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m.chat_id}
            className={`flex ${
              m.sender === userRole ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                m.sender === userRole
                  ? "text-white"
                  : "text-gray-900 border border-gray-200"
              }`}
              style={
                m.sender === userRole
                  ? { backgroundColor: "#17252A" }
                  : { backgroundColor: "#FFFAFA" }
              }
            >
              <p className="text-sm">{m.message}</p>
              <p
                className={`text-xs mt-1 ${
                  m.sender === userRole ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {m.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2">Quick messages:</p>
      <div className="flex flex-wrap gap-2">
        {quickMessages.map((q, i) => (
          <button
            key={i}
            onClick={() => onSend(q)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:opacity-80"
            style={{ backgroundColor: "#FFFAFA" }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
    <div className="flex gap-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
        style={{ backgroundColor: "#FFFAFA" }}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
      />
      <button
        onClick={() => onSend()}
        className="p-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#17252A" }}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  </div>
);

/* --- CallInfoPanel, TrackingPanel, ShareTripPanel can remain identical
       to your earlier implementation, so they are omitted for brevity.  */

export default ActiveRide;
