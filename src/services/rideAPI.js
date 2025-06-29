import axios from 'axios';

const API_BASE = 'http://localhost:3000/api'; // change to your server URL

export const getRideById = async (rideId) => {
  const res = await axios.get(`${API_BASE}/rides/${rideId}`);
  return res.data;
};

export const createRideRequest = async (rideData) => {
  const res = await axios.post(`${API_BASE}/rides/requests`, rideData);
  return res.data;
};

// For drivers creating rides with available seats
export const createRide = async (rideData) => {
  const res = await axios.post(`${API_BASE}/rides`, rideData);
  return res.data;
};

// Get all available rides
export const getAvailableRides = async () => {
  const res = await axios.get(`${API_BASE}/rides/available`);
  return res.data;
};

// Get all rides
export const getRides = async () => {
  const res = await axios.get(`${API_BASE}/rides`);
  return res.data;
};

// Get ride requests by user ID
export const getRideRequestsByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/rides/requests/user/${userId}`);
  return res.data;
};
