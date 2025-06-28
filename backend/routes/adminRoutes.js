import express from "express";
import { getAllUsers, getDashboardStats, searchUsers, getUserVerificationDetails, approveUserVerification, rejectUserVerification, banUser, unbanUser, getVerificationLogs, deleteUser } from "../controllers/adminController.js";
import authenticateToken from "../middlewares/authenticate.js";

const router = express.Router();

// Get all users for admin dashboard
router.get("/users", getAllUsers);

// Get dashboard statistics
router.get("/stats", getDashboardStats);

// Search users
router.get("/search", searchUsers);

// User verification routes
router.get("/users/:userId/verification", getUserVerificationDetails);
router.post("/users/:userId/approve", approveUserVerification);
router.post("/users/:userId/reject", rejectUserVerification);
router.post("/users/:userId/ban", banUser);
router.post("/users/:userId/unban", unbanUser);
router.get("/users/:userId/verification-logs", getVerificationLogs);

router.delete('/users/:userId', authenticateToken, deleteUser);

export default router; 