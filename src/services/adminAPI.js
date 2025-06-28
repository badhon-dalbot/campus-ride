const API_BASE_URL = 'http://localhost:3000/api';

// Fetch all users for admin dashboard
export const fetchAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch dashboard statistics
export const fetchDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Search users
export const searchUsers = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/search?query=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

// Get user verification details
export const fetchUserVerificationDetails = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/verification`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user verification details:', error);
    throw error;
  }
};

// Approve user verification
export const approveUserVerification = async (userId, adminNotes = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/approve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminNotes }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error approving user verification:', error);
    throw error;
  }
};

// Reject user verification
export const rejectUserVerification = async (userId, reason, adminNotes = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason, adminNotes }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error rejecting user verification:', error);
    throw error;
  }
};

// Ban user
export const banUser = async (userId, reason, duration = null, adminNotes = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/ban`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason, duration, adminNotes }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
};

// Unban user
export const unbanUser = async (userId, adminNotes = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/unban`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminNotes }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error unbanning user:', error);
    throw error;
  }
};

// Get verification logs
export const fetchVerificationLogs = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/verification-logs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching verification logs:', error);
    throw error;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete user');
    }

    return data;
  } catch (error) {
    throw error;
  }
}; 