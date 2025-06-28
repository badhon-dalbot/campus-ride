import axios from 'axios';

const API_BASE = 'http://localhost:3000/api'; // change to your server URL

export const getRideById = async (rideId) => {
  const res = await axios.get(`${API_BASE}/rides/${rideId}`);
  return res.data;
};

export const createRideRequest = async (rideData) => {
  const res = await axios.post(`${API_BASE}/rides`, rideData);
  return res.data;
};
