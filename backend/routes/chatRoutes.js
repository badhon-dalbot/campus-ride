import express from "express";
import { message, sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/:user1/:user2", message);
router.post("/", sendMessage);

export default router;
