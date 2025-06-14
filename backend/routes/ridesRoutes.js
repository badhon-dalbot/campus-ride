import express from "express";
import { createRide, getRides, getAvailableRides } from "../controllers/rideController.js";

const router = express.Router();

router.get("/", getRides);
router.post("/", createRide);
router.get("/available", getAvailableRides);

export default router;
