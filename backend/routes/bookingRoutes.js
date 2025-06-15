import express from "express";
import { booking, createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:userId/:ridesId", booking);
router.post("/", createBooking);

export default router;
