import express from "express";
import {
  getAcceptedRides,
  getDriverDashboard,
  getDriverPreferences,
  getDriverProfile,
  getRideRequests,
  getTotalTrips,
  updateDriverBio,
  updateDriverPreferences,
  updateRideRequest,
  updateVehicleInfo,
} from "../controllers/driverController.js";
import { getDriverRides } from "../controllers/rideController.js";
const router = express.Router();

router.get("/:id/profile", getDriverProfile);
router.get("/:id/active-rides", getDriverRides);
router.get("/:id/preferences", getDriverPreferences);
router.patch("/:id/preferences", updateDriverPreferences);
router.put("/:id/bio", updateDriverBio);
router.put("/:id/vehicle", updateVehicleInfo);
router.get("/:id/dashboard", getDriverDashboard);
router.get("/:driverId/trips", getTotalTrips);
router.get("/:driverId/accepted-rides", getAcceptedRides);
router.get("/:driverId/ride-requests", getRideRequests);
router.patch("/ride-request/:id", updateRideRequest);
export default router;
