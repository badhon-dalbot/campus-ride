import bcrypt from "bcrypt";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";

import db from "../config/db.js";
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(user, (process.env.ACCESS_TOKEN_SECRET || "accesstoken"), { expiresIn: "15m" });
};

// const generateRefreshToken = async (user, userId) => {
//   const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//   const expiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
//   const expiresAt = new Date(Date.now() + expiresIn * 1000);
//   await db.query("INSERT INTO refresh_tokens (id, token, expires_at) VALUES (?, ?, ?)", [
//     userId,
//     token,
//     expiresAt,
//   ]);
//   return token;
// };
const generateRefreshToken = async (user, userId) => {
  const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "myrefreshtoken", {
    expiresIn: "7d",
  });

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.query(
    "INSERT INTO refresh_tokens (user_i d, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt]
  );

  return token;
};
const register = async (req, res) => {
  const { firstName, lastName, phone, email, password, confirmPassword, role } =
    req.body;
  const document = req.file;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !password ||
    !confirmPassword ||
    !role ||
    !document
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!document) {
    return res.status(400).json({ error: "File is required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }
  if (!["ride", "driver"].includes(role)) {
    return res
      .status(400)
      .json({ error: "Role must be either 'ride' or 'driver'" });
  }
  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error checking existing user" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [rows] = await db.query(
      "INSERT INTO users (firstName, lastName, phone, email, password, role, document) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        firstName,
        lastName,
        phone,
        email,
        hashedPassword,
        role,
        document.filename,
      ]
    );

    res.status(201).json({
      id: rows.insertId,
      email,
      role,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    console.log("Login request body:", email, password);
     if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid password" });

    const accessToken = generateAccessToken({
      id: user.id,
      name: user.username,
    });
    const refreshToken = await generateRefreshToken(
      { id: user.id, name: user.username },
      user.id
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const [rows] = await db.query(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [refreshToken]
    );
    if (rows.length === 0) return res.sendStatus(403);

    // const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = jwt.verify(refreshToken, "myrefreshtoken");
    const accessToken = generateAccessToken({ id: user.id, name: user.name });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ error: "Error refreshing token" });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  try {
    await db.query("DELETE FROM refresh_tokens WHERE token = ?", [
      refreshToken,
    ]);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { login, logout, refreshToken, register };
