import express from "express";
import { createRide, getRides, getAvailableRides, getRideById } from "../controllers/rideController.js";

const router = express.Router();

router.get("/", getRides);
router.post("/", createRide);
router.get("/available", getAvailableRides);
router.get("/:id", getRideById);

export default router;
