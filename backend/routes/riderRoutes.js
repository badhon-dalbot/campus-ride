import express from "express";
const router = express.Router();

import { getRiderProfile, updateRiderBio, getRiderPreferences, updateRiderPreferences } from "../controllers/riderController.js";

router.get("/:id/profile", getRiderProfile);
router.put('/:id/bio', updateRiderBio);
router.get('/:id/preferences', getRiderPreferences);
router.put('/:id/preferences', updateRiderPreferences);

export default router;