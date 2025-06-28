import CampusRideHeader from "../components/CampusRideHeader";

const ConfirmBooking = () => {
  return (
    <div className="bg-[#f4f8f9] text-[#1f2b38] font-sans min-h-screen flex flex-col">
      {/* Header */}
      <CampusRideHeader />

      {/* Confirmation Content */}
      <main className="flex-grow flex items-center justify-center py-20 px-4">
        {/* Outer Box now wider */}
        <div className="bg-[#eaf4f5] px-10 py-10 rounded-2xl shadow-xl w-full max-w-3xl text-center border border-[#d1e6e8]">
          {/* ✅ Tick Icon Centered Above */}
          <div className="flex justify-center mb-4">
            <div className="text-4xl">✔️</div>
          </div>

          {/* Booking Confirmed Heading */}
          <h2 className="text-3xl font-semibold mb-5 text-[#1f2b38]">
            Booking Confirmed!
          </h2>

          {/* Booking Details Inner Box */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-left space-y-5 border border-gray-200 max-w-md mx-auto">
            {/* Top: Booking Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-sm font-medium text-gray-600">
                Booking Details
              </div>
              <div className="text-sm font-semibold text-[#1f2b38]">
                CR-ABC10
              </div>
            </div>

            {/* Trip Details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-500 font-medium">Pickup</p>
                <p className="font-semibold">BU campus</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Date</p>
                <p className="font-semibold">Today</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Drop Off</p>
                <p className="font-semibold">Dhanmondi</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Time</p>
                <p className="font-semibold">4:30 PM</p>
              </div>
            </div>

            {/* Line */}
            <div className="border-t pt-3" />

            {/* Passenger Name */}
            <div className="text-sm font-semibold text-[#1f2b38]">John Doe</div>

            {/* Fare Info */}
            <div className="flex justify-between items-center text-sm mt-2">
              <p className="text-gray-600">Total Paid</p>
              <p className="font-bold text-[#1f2b38]">৳ 15</p>
            </div>

            {/* Button */}
            <button className="mt-4 w-full bg-[#1f2b38] text-white py-2 rounded-md hover:opacity-90 transition text-sm font-medium">
              Download Receipt
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1f2b38] text-white px-10 py-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Products</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Ride
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reserve
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Share your Ride
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Travel</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  University
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  City
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Campus
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm">
              CampusRide is a Community-Based Ridesharing Platform developed to
              empower campus commuters with smart travel options.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConfirmBooking;
