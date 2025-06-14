import React, { useState } from 'react';
import { Send, Phone, Video, MoreHorizontal, ArrowLeft, Paperclip, Smile, Search, Star } from 'lucide-react';

import CampusRideFooter from '../assets/CampusRideFooter.jsx';
import CampusRideHeader from '../assets/CampusRideHeader.jsx';

export default function ChattingPage() {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState(0);

  const chatList = [
    {
      id: 0,
      name: "Sarah Johnson",
      lastMessage: "Great! See you at 3 PM at the main gate",
      time: "2m ago",
      unread: 2,
      avatar: "https://i.pravatar.cc/150?img=1",
      online: true,
      trip: "UIU → Dhanmondi"
    },
    {
      id: 1,
      name: "Mike Chen",
      lastMessage: "Thanks for the ride today! 5 stars ⭐",
      time: "15m ago",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=2",
      online: false,
      trip: "NSU → Farmgate"
    },
    {
      id: 2,
      name: "Emily Davis",
      lastMessage: "Are we still on for tomorrow's trip?",
      time: "1h ago",
      unread: 1,
      avatar: "https://i.pravatar.cc/150?img=3",
      online: true,
      trip: "BRAC → Gulshan"
    },
    {
      id: 3,
      name: "Alex Rahman",
      lastMessage: "Perfect! I'll be there",
      time: "3h ago",
      unread: 0,
      avatar: "https://i.pravatar.cc/150?img=4",
      online: false,
      trip: "UIU → Mirpur"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hi! I'm the driver for tomorrow's trip to Dhanmondi. Just wanted to confirm the pickup time.",
      time: "10:30 AM",
      isCurrentUser: false
    },
    {
      id: 2,
      sender: "You",
      content: "Hello! Yes, 3 PM works perfectly for me. Where exactly at the main gate should I wait?",
      time: "10:35 AM",
      isCurrentUser: true
    },
    {
      id: 3,
      sender: "Sarah Johnson",
      content: "I'll be in a blue Honda Civic. I'll wait right by the security booth at the main entrance. My license plate is DHK-1234.",
      time: "10:37 AM",
      isCurrentUser: false
    },
    {
      id: 4,
      sender: "You",
      content: "Perfect! I'll be wearing a red backpack so you can spot me easily.",
      time: "10:40 AM",
      isCurrentUser: true
    },
    {
      id: 5,
      sender: "Sarah Johnson",
      content: "Great! See you at 3 PM at the main gate 😊",
      time: "10:42 AM",
      isCurrentUser: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <CampusRideHeader />
      
      {/* Main Content */}
      <div className="flex-1" style={{backgroundColor: '#EBF5F5'}}>
        <div className="h-[calc(100vh-140px)] flex">
          {/* Sidebar - Chat List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
            
            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeChat === chat.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {chat.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-xs text-blue-600 font-medium mb-1">{chat.trip}</p>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={chatList[activeChat].avatar}
                    alt={chatList[activeChat].name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{chatList[activeChat].name}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-blue-600">{chatList[activeChat].trip}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500">4.8</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{backgroundColor: '#F8FAFA'}}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${msg.isCurrentUser ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        msg.isCurrentUser
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    <p className={`text-xs text-gray-500 mt-1 ${msg.isCurrentUser ? 'text-right' : 'text-left'}`}>
                      {msg.time}
                    </p>
                  </div>
                  {!msg.isCurrentUser && (
                    <img
                      src={chatList[activeChat].avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full object-cover order-1 mr-2"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="absolute right-3 top-2 p-1 text-gray-500 hover:text-gray-700 transition-colors">
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <CampusRideFooter />
    </div>
  );
}