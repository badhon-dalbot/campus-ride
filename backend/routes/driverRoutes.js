import express from "express";
import { getDriverRides } from "../controllers/rideController.js";
import { getDriverProfile, updatePreferences, updateDriverBio } from '../controllers/driverController.js';
const router = express.Router();

router.get('/:id/profile', getDriverProfile);
router.get('/:id/active-rides', getDriverRides)
router.put('/:id/preferences', updatePreferences);
router.put('/:id/bio', updateDriverBio);


export default router;