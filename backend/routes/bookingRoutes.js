import express from "express";
import { booking, createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/:userId/:ridesId", booking);
router.post("/confirm", createBooking);

export default router;
