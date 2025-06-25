import express from "express";
import { getDriverProfile } from '../controllers/driverController.js';
import { getDriverRides } from "../controllers/rideController.js";

const router = express.Router();

router.get('/:id/profile', getDriverProfile);
router.get('/:id/active-rides', getDriverRides)

export default router;