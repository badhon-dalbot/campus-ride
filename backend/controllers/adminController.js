import db from "../config/db.js";

// Get all users for admin dashboard
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.execute(`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        phone,
        role,
        account_status,
        document_path,
        created_at
      FROM users 
      ORDER BY created_at DESC
    `);

    // Transform the data to match frontend expectations
    const transformedUsers = users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      account_status: user.account_status,
      document_path: user.document_path,
      created_at: user.created_at
    }));

    res.status(200).json({
      success: true,
      users: transformedUsers,
      total: transformedUsers.length
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Get user verification details
export const getUserVerificationDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const [users] = await db.execute(`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        phone,
        role,
        account_status,
        document_path,
        created_at
      FROM users 
      WHERE id = ?
    `, [userId]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];
    let vehicleData = null;

    // If user is a driver, fetch vehicle information
    if (user.role === 'driver') {
      const [vehicles] = await db.execute(`
        SELECT 
          id,
          driver_id,
          make,
          model,
          color,
          fuel_type,
          seats,
          last_maintenance,
          license_plate,
          created_at
        FROM vehicles 
        WHERE driver_id = ?
      `, [userId]);

      if (vehicles.length > 0) {
        vehicleData = vehicles[0];
      }
    }

    const userData = {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      phone: user.phone,
      role: user.role,
      accountStatus: user.account_status,
      verificationStatus: user.account_status === 'verified' ? 'approved' : 
                         user.account_status === 'suspended' ? 'rejected' : 'pending',
      isVerified: user.account_status === 'verified',
      joined: new Date(user.created_at).toISOString().split('T')[0],
      documents: {
        profilePicture: null,
        driverLicense: user.document_path,
        vehicleRegistration: null,
        insurance: null,
        otherDocuments: user.document_path
      },
      vehicle: vehicleData
    };

    res.status(200).json({
      success: true,
      data: userData
    });

  } catch (error) {
    console.error('Error fetching user verification details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user verification details',
      error: error.message
    });
  }
};

// Approve user verification
export const approveUserVerification = async (req, res) => {
  try {
    const { userId } = req.params;
    const { adminNotes } = req.body;

    // Update user account status to verified
    await db.execute(`
      UPDATE users 
      SET account_status = 'verified'
      WHERE id = ?
    `, [userId]);

    res.status(200).json({
      success: true,
      message: 'User verification approved successfully'
    });

  } catch (error) {
    console.error('Error approving user verification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve user verification',
      error: error.message
    });
  }
};

// Reject user verification
export const rejectUserVerification = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason, adminNotes } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    // Update user account status to suspended (rejected)
    await db.execute(`
      UPDATE users 
      SET account_status = 'suspended'
      WHERE id = ?
    `, [userId]);

    res.status(200).json({
      success: true,
      message: 'User verification rejected successfully'
    });

  } catch (error) {
    console.error('Error rejecting user verification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject user verification',
      error: error.message
    });
  }
};

// Ban/Suspend user
export const banUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason, duration, adminNotes } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Ban reason is required'
      });
    }

    // Update user account status to suspended (banned)
    await db.execute(`
      UPDATE users 
      SET account_status = 'suspended'
      WHERE id = ?
    `, [userId]);

    res.status(200).json({
      success: true,
      message: 'User banned successfully'
    });

  } catch (error) {
    console.error('Error banning user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to ban user',
      error: error.message
    });
  }
};

// Unban user
export const unbanUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { adminNotes } = req.body;

    // Update user account status to pending (unbanned)
    await db.execute(`
      UPDATE users 
      SET account_status = 'pending'
      WHERE id = ?
    `, [userId]);

    res.status(200).json({
      success: true,
      message: 'User unbanned successfully'
    });

  } catch (error) {
    console.error('Error unbanning user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unban user',
      error: error.message
    });
  }
};

// Get verification logs (simplified - using existing data)
export const getVerificationLogs = async (req, res) => {
  try {
    const { userId } = req.params;

    // For now, return a simple log based on account status
    const [users] = await db.execute(`
      SELECT account_status, created_at
      FROM users 
      WHERE id = ?
    `, [userId]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];
    const logs = [{
      id: 1,
      user_id: userId,
      action: user.account_status === 'verified' ? 'approved' : 
              user.account_status === 'suspended' ? 'rejected' : 'pending',
      admin_notes: 'Account status updated',
      created_at: user.created_at
    }];

    res.status(200).json({
      success: true,
      data: logs
    });

  } catch (error) {
    console.error('Error fetching verification logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch verification logs',
      error: error.message
    });
  }
};

// Get admin dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get total users count
    const [totalUsersResult] = await db.execute('SELECT COUNT(*) as total FROM users');
    const totalUsers = totalUsersResult[0].total;

    // Get active users count (users with verified status)
    const [activeUsersResult] = await db.execute(`
      SELECT COUNT(*) as active 
      FROM users 
      WHERE account_status = 'verified'
    `);
    const activeUsers = activeUsersResult[0].active;

    // Get drivers count
    const [driversResult] = await db.execute(`
      SELECT COUNT(*) as drivers 
      FROM users 
      WHERE role = 'driver'
    `);
    const drivers = driversResult[0].drivers;

    // Get pending verifications (users with pending status)
    const [pendingVerificationsResult] = await db.execute(`
      SELECT COUNT(*) as pending 
      FROM users 
      WHERE account_status = 'pending'
    `);
    const pendingVerification = pendingVerificationsResult[0].pending;

    res.status(200).json({
      success: true,
      data: {
        totalUsers: totalUsers,
        activeUsers: activeUsers,
        drivers: drivers,
        pendingVerification: pendingVerification
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

// Search users
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const [users] = await db.execute(`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        phone,
        role,
        account_status,
        document_path,
        created_at
      FROM users 
      WHERE 
        first_name LIKE ? OR 
        last_name LIKE ? OR 
        email LIKE ? OR 
        phone LIKE ?
      ORDER BY created_at DESC
    `, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);

    // Transform the data to match frontend expectations
    const transformedUsers = users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      account_status: user.account_status,
      document_path: user.document_path,
      created_at: user.created_at
    }));

    res.status(200).json({
      success: true,
      users: transformedUsers,
      total: transformedUsers.length
    });

  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search users',
      error: error.message
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // First check if user exists
    const [users] = await db.execute('SELECT id, role FROM users WHERE id = ?', [userId]);
    
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    // If user is a driver, delete their vehicle first
    if (user.role === 'driver') {
      await db.execute('DELETE FROM vehicles WHERE driver_id = ?', [userId]);
    }

    // Delete related data (bookings, messages, ratings, etc.)
    await db.execute('DELETE FROM bookings WHERE rider_id = ? OR ride_id IN (SELECT id FROM rides WHERE creator_id = ?)', [userId, userId]);
    await db.execute('DELETE FROM messages WHERE sender_id = ? OR receiver_id = ?', [userId, userId]);
    await db.execute('DELETE FROM ratings WHERE rater_id = ? OR ratee_id = ?', [userId, userId]);
    await db.execute('DELETE FROM payments WHERE booking_id IN (SELECT id FROM bookings WHERE rider_id = ?)', [userId]);
    await db.execute('DELETE FROM user_preferences WHERE user_id = ?', [userId]);
    await db.execute('DELETE FROM refresh_tokens WHERE user_id = ?', [userId]);
    
    // Delete rides created by this user
    await db.execute('DELETE FROM rides WHERE creator_id = ?', [userId]);
    
    // Finally delete the user
    await db.execute('DELETE FROM users WHERE id = ?', [userId]);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
}; 