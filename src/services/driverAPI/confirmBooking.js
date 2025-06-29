import axios from "axios";

export async function confirmBooking({ ride_id, rider_id, seats_booked = 1 }) {
  const res = await axios.post(
    `http://localhost:3000/api/booking/confirm`,
    {
      ride_id,
      rider_id,
      seats_booked,
    },
    {
      withCredentials: true,
    }
  );
  return res.data;
}
export async function cancelBooking(rideId, userId) {
  const res = await axios.post(`/api/booking/cancel`, {
    rideId,
    userId,
  });
  return res.data;
}
