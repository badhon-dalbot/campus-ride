import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  X as XIcon, 
  Ban, 
  UserCheck, 
  FileText, 
  Download,
  AlertCircle,
  Clock,
  Shield,
  Loader2,
  Eye
} from 'lucide-react';
import { 
  fetchUserVerificationDetails, 
  approveUserVerification, 
  rejectUserVerification, 
  banUser, 
  unbanUser,
  fetchVerificationLogs 
} from '../services/adminAPI.js';

const UserVerificationModal = ({ user, onClose, onAction, isReadOnly = false }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [verificationLogs, setVerificationLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [banReason, setBanReason] = useState('');
  const [banDuration, setBanDuration] = useState(7);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showBanForm, setShowBanForm] = useState(false);

  // Generate user photo based on user ID or name
  const getUserPhoto = (user) => {
    if (user?.id) {
      // Using DiceBear API for consistent avatars
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=default&backgroundColor=b6e3f4`;
  };

  // Get user display name
  const getUserDisplayName = (user) => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.name) {
      return user.name;
    }
    return 'Unknown User';
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [detailsResponse, logsResponse] = await Promise.all([
        fetchUserVerificationDetails(user.id),
        fetchVerificationLogs(user.id)
      ]);

      if (detailsResponse.success) {
        setUserDetails(detailsResponse.data);
      }

      if (logsResponse.success) {
        setVerificationLogs(logsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      const response = await approveUserVerification(user.id, adminNotes);
      
      if (response.success) {
        alert('User verification approved successfully!');
        onAction();
        onClose();
      }
    } catch (error) {
      alert('Failed to approve user verification');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    try {
      setActionLoading(true);
      const response = await rejectUserVerification(user.id, rejectionReason, adminNotes);
      
      if (response.success) {
        alert('User verification rejected successfully!');
        onAction();
        onClose();
      }
    } catch (error) {
      alert('Failed to reject user verification');
    } finally {
      setActionLoading(false);
    }
  };

  const handleBan = async () => {
    if (!banReason.trim()) {
      alert('Please provide a ban reason');
      return;
    }

    try {
      setActionLoading(true);
      const response = await banUser(user.id, banReason, banDuration, adminNotes);
      
      if (response.success) {
        alert('User banned successfully!');
        onAction();
        onClose();
      }
    } catch (error) {
      alert('Failed to ban user');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnban = async () => {
    try {
      setActionLoading(true);
      const response = await unbanUser(user.id, adminNotes);
      
      if (response.success) {
        alert('User unbanned successfully!');
        onAction();
        onClose();
      }
    } catch (error) {
      alert('Failed to unban user');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: <Clock size={14} /> },
      approved: { color: 'bg-green-100 text-green-700', icon: <Check size={14} /> },
      rejected: { color: 'bg-red-100 text-red-700', icon: <XIcon size={14} /> },
      banned: { color: 'bg-red-100 text-red-700', icon: <Ban size={14} /> }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        {config.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      driver: { color: 'bg-orange-100 text-orange-700', icon: <Shield size={14} /> },
      rider: { color: 'bg-teal-100 text-teal-700', icon: <UserCheck size={14} /> }
    };

    const config = roleConfig[role] || roleConfig.rider;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        {config.icon}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 w-[90%] max-w-2xl">
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin" size={32} />
            <span className="ml-2">Loading user details...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[95%] max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <img src={getUserPhoto(user)} alt={getUserDisplayName(user)} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-xl font-bold">{getUserDisplayName(user)}</h2>
              <div className="flex items-center gap-2 mt-1">
                {getRoleBadge(userDetails?.role || user.status)}
                {getStatusBadge(userDetails?.verificationStatus || 'pending')}
                {isReadOnly && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    <Eye size={12} />
                    Read Only
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'details' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            User Details
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'documents' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'history' 
                ? 'border-b-2 border-blue-500 text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Verification History
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* User Photo and Basic Info */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="flex flex-col items-center">
                  <img 
                    src={getUserPhoto(user)} 
                    alt={getUserDisplayName(user)} 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg" 
                  />
                  <div className="mt-3 text-center">
                    <h3 className="font-bold text-lg text-gray-800">{getUserDisplayName(user)}</h3>
                    <p className="text-sm text-gray-600">{userDetails?.email || user.email}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {getRoleBadge(userDetails?.role || user.role)}
                      {getStatusBadge(userDetails?.verificationStatus || 'pending')}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {getUserDisplayName(user)}</p>
                      <p><strong>Email:</strong> {userDetails?.email || user.email}</p>
                      <p><strong>Phone:</strong> {userDetails?.phone || user.phone || 'N/A'}</p>
                      <p><strong>Role:</strong> {userDetails?.role || user.role}</p>
                      <p><strong>Joined:</strong> {userDetails?.joined || new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Account Status</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Verification Status:</strong> {getStatusBadge(userDetails?.verificationStatus || 'pending')}</p>
                      <p><strong>Account Status:</strong> {userDetails?.accountStatus || user.account_status || 'active'}</p>
                      <p><strong>Verified:</strong> {userDetails?.isVerified ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Information - Only show for drivers */}
              {userDetails?.role === 'driver' && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                      <Shield size={12} />
                      Driver
                    </span>
                    Vehicle Information
                  </h3>
                  
                  {userDetails?.vehicle ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 text-sm">
                        <p><strong>Make:</strong> {userDetails.vehicle.make}</p>
                        <p><strong>Model:</strong> {userDetails.vehicle.model}</p>
                        <p><strong>Color:</strong> {userDetails.vehicle.color || 'N/A'}</p>
                        <p><strong>Fuel Type:</strong> {userDetails.vehicle.fuel_type || 'N/A'}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Seats:</strong> {userDetails.vehicle.seats}</p>
                        <p><strong>License Plate:</strong> {userDetails.vehicle.license_plate || 'N/A'}</p>
                        <p><strong>Last Maintenance:</strong> {userDetails.vehicle.last_maintenance ? new Date(userDetails.vehicle.last_maintenance).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Vehicle Added:</strong> {new Date(userDetails.vehicle.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="text-yellow-600" size={16} />
                        <span className="text-yellow-800 font-medium">No Vehicle Information</span>
                      </div>
                      <p className="text-yellow-700 text-sm mt-1">
                        This driver hasn't added vehicle information yet.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Admin Notes - Only show in edit mode */}
              {!isReadOnly && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Admin Notes</h3>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add admin notes..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
              )}

              {/* Action Buttons - Only show in edit mode */}
              {!isReadOnly && (
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  {userDetails?.verificationStatus === 'pending' && (
                    <>
                      <button
                        onClick={() => setShowRejectForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        disabled={actionLoading}
                      >
                        {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <XIcon size={16} />}
                        Reject Verification
                      </button>
                      <button
                        onClick={handleApprove}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        disabled={actionLoading}
                      >
                        {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                        Approve Verification
                      </button>
                    </>
                  )}
                  
                  {userDetails?.accountStatus !== 'banned' ? (
                    <button
                      onClick={() => setShowBanForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      disabled={actionLoading}
                    >
                      {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <Ban size={16} />}
                      Ban User
                    </button>
                  ) : (
                    <button
                      onClick={handleUnban}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      disabled={actionLoading}
                    >
                      {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <UserCheck size={16} />}
                      Unban User
                    </button>
                  )}
                </div>
              )}

              {/* Read-only message */}
              {isReadOnly && (
                <div className="pt-4 border-t">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Eye className="text-blue-600" size={16} />
                      <span className="text-blue-800 font-medium">Read-only Mode</span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      This is a view-only mode. Use the edit icon to manage verification actions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-700 mb-4">User Documents</h3>
              
              {userDetails?.documents ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(userDetails.documents).map(([key, path]) => (
                    path && (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download size={16} />
                          </button>
                        </div>
                        <div className="bg-gray-100 rounded p-2 text-sm text-gray-600">
                          {path}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No documents uploaded</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-4">Verification History</h3>
              
              {verificationLogs.length > 0 ? (
                <div className="space-y-3">
                  {verificationLogs.map((log) => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          log.action === 'approved' ? 'bg-green-100 text-green-700' :
                          log.action === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(log.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {log.admin_notes && (
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Notes:</strong> {log.admin_notes}
                        </p>
                      )}
                      {log.rejection_reason && (
                        <p className="text-sm text-red-600">
                          <strong>Reason:</strong> {log.rejection_reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No verification history found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reject Form Modal - Only show in edit mode */}
        {showRejectForm && !isReadOnly && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
              <h3 className="font-bold mb-4">Reject Verification</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rejection Reason *</label>
                  <select
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="Invalid documents">Invalid documents</option>
                    <option value="Incomplete information">Incomplete information</option>
                    <option value="Suspicious activity">Suspicious activity</option>
                    <option value="Policy violation">Policy violation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRejectForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    disabled={!rejectionReason || actionLoading}
                  >
                    {actionLoading ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ban Form Modal - Only show in edit mode */}
        {showBanForm && !isReadOnly && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
              <h3 className="font-bold mb-4">Ban User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ban Reason *</label>
                  <select
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="Inappropriate behavior">Inappropriate behavior</option>
                    <option value="Safety violation">Safety violation</option>
                    <option value="Fraudulent activity">Fraudulent activity</option>
                    <option value="Policy violation">Policy violation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ban Duration (days)</label>
                  <input
                    type="number"
                    value={banDuration}
                    onChange={(e) => setBanDuration(parseInt(e.target.value))}
                    min="1"
                    max="365"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowBanForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBan}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    disabled={!banReason || actionLoading}
                  >
                    {actionLoading ? <Loader2 className="animate-spin mx-auto" size={16} /> : 'Ban User'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVerificationModal;
