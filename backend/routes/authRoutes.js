import express from "express";
import {
  checkToken,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import authenticateToken from "../middlewares/authenticate.js";
import upload from "../middlewares/fileUploads.js";

const router = express.Router();

router.post("/register", upload.single("document"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", checkToken);
router.get("/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "This is a protected route", user: req.user });
});

export default router;
