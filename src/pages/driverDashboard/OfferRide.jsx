import { Calendar, Clock, DollarSign, MapPin, Users, X } from "lucide-react";
import { useState } from "react";

export default function OfferRideModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: 1,
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ride Offered:", form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-trasparent bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold mb-6">Offer a Ride</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Pickup Location
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                name="from"
                value={form.from}
                onChange={handleChange}
                placeholder="e.g. Downtown"
                className="w-full text-sm outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Drop-off Location
            </label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder="e.g. North Campus"
                className="w-full text-sm outline-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Date</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Time</label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <Clock className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full text-sm outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Seats Available
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <Users className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="number"
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  min={1}
                  className="w-full text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Price per Seat ($)
              </label>
              <div className="flex items-center border border-gray-300 rounded px-3 py-2">
                <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min={1}
                  className="w-full text-sm outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-night-ink text-white py-2 rounded text-sm font-medium hover:bg-opacity-90"
          >
            Post Ride
          </button>
        </form>
      </div>
    </div>
  );
}
