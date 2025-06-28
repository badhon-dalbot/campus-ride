import express from "express";
import {
  getAcceptedRides,
  getDriverDashboard,
  getDriverProfile,
  getRideRequests,
  getTotalTrips,
  updateDriverBio,
  updatePreferences,
  updateRideRequest,
  updateVehicleInfo,
} from "../controllers/driverController.js";
import { getDriverRides } from "../controllers/rideController.js";
const router = express.Router();

router.get("/:id/profile", getDriverProfile);
router.get("/:id/active-rides", getDriverRides);
router.put("/:id/preferences", updatePreferences);
router.put("/:id/bio", updateDriverBio);
router.put("/:id/vehicle", updateVehicleInfo);
router.get("/:id/dashboard", getDriverDashboard);
router.get("/:id/trips", getTotalTrips);
router.get("/:driverId/accepted-rides", getAcceptedRides);
router.get("/:driverId/ride-requests", getRideRequests);
router.patch("/ride-request/:id", updateRideRequest)
export default router;
