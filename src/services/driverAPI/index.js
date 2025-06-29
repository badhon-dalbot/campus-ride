import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

// Get pending ride requests for a driver
export const getRideRequests = async (driverId) => {
  try {
    const response = await axios.get(`${API_BASE}/driver/${driverId}/ride-requests`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ride requests:', error);
    throw error;
  }
};

// Get accepted rides for a driver
export const getAcceptedRides = async (driverId) => {
  try {
    const response = await axios.get(`${API_BASE}/driver/${driverId}/accepted-rides`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching accepted rides:', error);
    throw error;
  }
};

// Update ride request status (accept/reject)
export const updateRideRequest = async (requestId, status) => {
  try {
    const response = await axios.patch(`${API_BASE}/driver/ride-request/${requestId}`, {
      status
    }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error updating ride request:', error);
    throw error;
  }
};

// Get driver dashboard data
export const getDriverDashboard = async (driverId) => {
  try {
    const response = await axios.get(`${API_BASE}/driver/${driverId}/dashboard`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching driver dashboard:', error);
    throw error;
  }
};

// Create a ride request (when a rider books a ride)
export const createRideRequest = async (rideRequestData) => {
  try {
    const response = await axios.post(`${API_BASE}/ride-requests`, rideRequestData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating ride request:', error);
    throw error;
  }
};

// Get ride request by ID
export const getRideRequestById = async (requestId) => {
  try {
    const response = await axios.get(`${API_BASE}/ride-requests/${requestId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ride request:', error);
    throw error;
  }
};

// Create a new ride (when driver offers a ride)
export const createRide = async (rideData) => {
  try {
    const response = await axios.post(`${API_BASE}/rides`, rideData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating ride:', error);
    throw error;
  }
}; 