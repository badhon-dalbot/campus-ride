import express from "express";
import { getDriverProfile, updatePreferences, updateDriverBio } from '../controllers/driverController.js';

const router = express.Router();

router.get('/:id/profile', getDriverProfile);
router.put('/:id/preferences', updatePreferences);
router.put('/:id/bio', updateDriverBio);

export default router;