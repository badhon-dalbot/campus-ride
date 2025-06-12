import express from "express";
import { booking, createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:userId", booking);
router.post("/", createBooking);

export default router;
