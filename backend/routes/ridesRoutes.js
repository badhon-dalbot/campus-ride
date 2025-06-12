import express from "express";
import { createRide, getRides } from "../controllers/rideController.js";

const router = express.ridesRoutes();

router.get("/", getRides);
router.post("/", createRide);

export default router;
