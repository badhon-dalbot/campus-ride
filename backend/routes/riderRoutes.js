import express from "express";
const router = express.Router();

import {
  getRiderPreferences,
  getRiderProfile,
  updateRiderBio,
  updateRiderPreferences,
} from "../controllers/riderController.js";

router.get("/:id/profile", getRiderProfile);
router.put("/:id/bio", updateRiderBio);
router.get("/:id/preferences", getRiderPreferences);
router.patch("/:id/preferences", updateRiderPreferences);

export default router;
