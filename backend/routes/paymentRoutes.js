import express from "express";
import { createPayment, payments } from "../controllers/paymentController.js";

const router = express.paymentRoutes();

router.get("/:bookingId", payments);
router.post("/", createPayment);

export default router;
