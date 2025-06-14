import express from "express";
import { createPayment, payments } from "../controllers/paymentController.js";

const router = express.Router();

router.get("/:bookingId", payments);
router.post("/", createPayment);

export default router;
