import express from "express";
import {
  getDriverDashboard,
  getDriverProfile,
  updateDriverBio,
  updatePreferences,
} from "../controllers/driverController.js";
import { getDriverRides } from "../controllers/rideController.js";
const router = express.Router();

router.get("/:id/profile", getDriverProfile);
router.get("/:id/active-rides", getDriverRides);
router.put("/:id/preferences", updatePreferences);
router.put("/:id/bio", updateDriverBio);
router.get("/:id/dashboard", getDriverDashboard);

export default router;
