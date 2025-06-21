import express from "express";
const router = express.Router();

import { getRiderProfile } from "../controllers/riderController.js";

router.get("/:id/profile", getRiderProfile);

export default router;