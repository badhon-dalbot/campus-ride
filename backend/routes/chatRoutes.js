import express from "express";
import { getChat } from "../controllers/chatController.js";

const router = express.Router();

// router.get("/:user1/:user2", message);
// router.post("/", sendMessage);
router.get("/:rideId/:userId", getChat);
export default router;
