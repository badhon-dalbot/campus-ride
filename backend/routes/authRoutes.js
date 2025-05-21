import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/authController.js";
import authenticateToken from "../middlewares/authenticate.js";
import upload from "../middlewares/fileUploads.js";

const router = express.Router();

router.post("/register", upload.single("document"), register);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.get("/refresh", refreshToken); // Refresh token route
router.get("/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

export default router;
