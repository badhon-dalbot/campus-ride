import axios from 'axios';

const API_BASE = 'http://localhost:3000/api'; // change as needed

export const getTotalTrips = async (driverId) => {
  const res = await axios.get(`${API_BASE}/drivers/${driverId}/trips`);
  return res.data.total_trips;
};
