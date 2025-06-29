import express from "express";
import { createRide, getRides, getAvailableRides, getRideById, createRideRequest, getRideRequestsByUser } from "../controllers/rideController.js";
import { createRideRequest as createDriverRideRequest, getRideRequestById } from "../controllers/driverController.js";

const router = express.Router();

router.get("/", getRides);
router.post("/", createRide); // For drivers creating rides with available seats
router.post("/requests", createRideRequest); // For riders requesting rides
router.get("/requests/user/:userId", getRideRequestsByUser); // Get ride requests by user
router.get("/available", getAvailableRides);
router.get("/:id", getRideById);

// Driver ride request routes (existing)
router.post("/driver-requests", createDriverRideRequest);
router.get("/driver-requests/:id", getRideRequestById);

export default router;
