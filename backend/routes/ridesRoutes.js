import express from "express";
import { createRide, getRides, getAvailableRides, getRideById } from "../controllers/rideController.js";
import { createRideRequest, getRideRequestById } from "../controllers/driverController.js";

const router = express.Router();

router.get("/", getRides);
router.post("/", createRide);
router.get("/available", getAvailableRides);
router.get("/:id", getRideById);

// Ride request routes
router.post("/requests", createRideRequest);
router.get("/requests/:id", getRideRequestById);

export default router;
