import { useNavigate } from "react-router-dom";
import { confirmBooking } from "../../services/driverAPI/confirmBooking.js";
export default function PaymentDetails({ fare, ride_id, seats_booked = 1 }) {
  const navigate = useNavigate();
  console.log(ride_id);

  const handleConfirmPay = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")).user;
      console.log(user.id);
      await confirmBooking({
        ride_id: Number(ride_id), // Ensure it's a number if required
        rider_id: Number(user.id), // Ensure it's a number if required
        seats_booked: Number(seats_booked) || 1, // Default to 1 if not provided
      });
      navigate("/conf-book");
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#D4E4E4] rounded-lg p-5 border border-black shadow-lg">
      <h3 className="text-base font-semibold mb-4 text-gray-800">
        Price Details
      </h3>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Ride fare</span>
          <span className="text-gray-800 font-medium text-sm">৳{fare} </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Service fee</span>
          <span className="text-gray-800 font-medium text-sm">
            ৳{(parseFloat(fare) * 0.1).toFixed(2)}
          </span>
        </div>

        <hr className="border-gray-400 my-2" />

        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800 text-sm">Total</span>
          <span className="font-bold text-gray-800 text-sm">
            ৳ {(parseFloat(fare) + parseFloat(fare) * 0.1).toFixed(2)}
          </span>
        </div>
      </div>

      <button
        className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-colors mb-3 text-sm"
        onClick={handleConfirmPay}
      >
        Confirm and pay
      </button>

      <p className="text-xs text-gray-600 text-center leading-tight">
        By confirming you agree to the CampusRide terms of service and
        cancellation policy
      </p>
    </div>
  );
}
