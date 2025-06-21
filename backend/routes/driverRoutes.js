import express from "express";
import { getDriverProfile } from '../controllers/driverController.js';

const router = express.Router();

router.get('/:id/profile', getDriverProfile);

export default router;