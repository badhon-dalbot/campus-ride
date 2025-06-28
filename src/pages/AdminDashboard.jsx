import React, { useState } from "react";
import CampusRideFooter from '../components/CampusRideFooter.jsx';
import CampusRideHeader from '../components/CampusRideHeader.jsx';

import {
  Users,
  UserCheck,
  CalendarCheck,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  X
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([
    {
      name: "Alice Kim",
      id: "USR-1001",
      status: "Driver",
      email: "alice.kim@example.com",
      rides: 95,
      joined: "2023-02-10",
      activity: "Today, 09:00 AM",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    {
      name: "David Lee",
      id: "USR-1002",
      status: "Rider",
      email: "david.lee@example.com",
      rides: 30,
      joined: "2023-03-22",
      activity: "Yesterday, 05:22 PM",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sophia Turner",
      id: "USR-1003",
      status: "Rider",
      email: "sophia.turner@example.com",
      rides: 42,
      joined: "2023-05-16",
      activity: "Today, 11:45 AM",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Michael Chen",
      id: "USR-1004",
      status: "Driver",
      email: "michael.chen@example.com",
      rides: 130,
      joined: "2022-12-01",
      activity: "Today, 07:30 AM",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
      name: "Nina Patel",
      id: "USR-1005",
      status: "Rider",
      email: "nina.patel@example.com",
      rides: 18,
      joined: "2023-08-08",
      activity: "Yesterday, 06:10 PM",
      avatar: "https://i.pravatar.cc/150?img=45",
    }
  ]);

  const handleView = (user) => {
    setEditMode(false);
    setSelectedUser(user);
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setSelectedUser(user);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const handleApprove = () => {
    alert("User Approved!");
    setSelectedUser(null);
    setEditMode(false);
  };

  const handleBan = () => {
    alert("User Banned!");
    setSelectedUser(null);
    setEditMode(false);
  };

  return (
    <div className="bg-[#f4f8f9] text-[#1f2b38] font-sans min-h-screen">
      <CampusRideHeader />

      <div className="px-10 py-10">
        <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { title: "Total Users", value: "2,845", icon: <Users />, bg: "from-cyan-200 to-blue-300" },
            { title: "Active Today", value: "486", icon: <UserCheck />, bg: "from-pink-200 to-red-300" },
            { title: "Total Bookings", value: "12,456", icon: <CalendarCheck />, bg: "from-purple-200 to-indigo-300" },
            { title: "New Users", value: "385", icon: <UserPlus />, bg: "from-green-200 to-emerald-300" },
          ].map((card, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 shadow-md bg-gradient-to-br ${card.bg} text-[#1f2b38] flex items-center gap-4`}
            >
              <div className="bg-white p-3 rounded-full shadow-md">{card.icon}</div>
              <div>
                <p className="text-sm">{card.title}</p>
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-[#eaf4f5] text-gray-600">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Rides</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b group relative">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
                    <div>
                      <p className="font-semibold group-hover:underline cursor-pointer">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      user.status === "Driver"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-teal-100 text-teal-700"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.rides}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleView(user)}><Eye size={16} /></button>
                    <button className="text-indigo-600 hover:text-indigo-800" onClick={() => handleEdit(user)}><Pencil size={16} /></button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(user.id)}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedUser && editMode && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              onClick={() => setSelectedUser(null)}
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">User Verification</h2>

            <div className="text-center mb-4">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                Pending
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-800">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.status}</p>
              <p><strong>Total Rides:</strong> {selectedUser.rides}</p>
            </div>

            <div className="mt-6 flex justify-between gap-4">
              <button
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                onClick={handleApprove}
              >
                Approve
              </button>
              <button
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                onClick={handleBan}
              >
                Ban
              </button>
            </div>
          </div>
        </div>
      )}

      <CampusRideFooter />
    </div>
  );
};

export default AdminDashboard;
