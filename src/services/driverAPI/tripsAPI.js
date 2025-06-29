import axios from "axios";

const API_BASE = "http://localhost:3000/api"; // change as needed

export const getTotalTrips = async (driverId) => {
  const res = await axios.get(`${API_BASE}/driver/${driverId}/trips`);
  console.log(res.data);
  return res.data.total_trips;
};
