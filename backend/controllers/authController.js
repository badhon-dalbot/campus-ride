import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import db from "../config/db.js";
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "myaccesstoken", {
    expiresIn: "15m",
  });
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
const generateRefreshToken = async (user, userId, isAdmin = false) => {
  const token = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET || "myrefreshtoken",
    {
      expiresIn: "7d",
    }
  );

  if (isAdmin) {
    return token;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt]
  );

  return token;
};

// Register a new User
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

    if (role === "driver") {
      await db.query(
        "INSERT INTO driver (user_id, rating, review_count) VALUES (?, ?, ?)",
        [rows.insertId, 0, 0]
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // First: try users table
    let [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    let user = rows[0];
    let isAdmin = false;

    // If not found: try admin table
    if (!user) {
      [rows] = await db.query("SELECT * FROM admin WHERE email = ?", [email]);
      user = rows[0];
      isAdmin = true;
    }

    if (!user) return res.status(400).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid password" });

    const role = isAdmin ? "admin" : user.role;
    const name = user.firstName || user.name || "Admin";

    const accessToken = generateAccessToken({ id: user.id, name, email, role });
    const refreshToken = await generateRefreshToken(
      { id: user.id, name, role },
      user.id,
      isAdmin
    );

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json({
        message: "Login Successful",
        user: { id: user.id, email: user.email, role },
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Refresh access token
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const [rows] = await db.query(
      `SELECT rt.*, u.role
   FROM refresh_tokens rt
   JOIN users u ON rt.user_id = u.id
   WHERE rt.token = ?;`,
      [refreshToken]
    );

    if (rows.length === 0) return res.sendStatus(403);
    console.log("Rows:", [rows]);

    const user = jwt.verify(refreshToken, "myrefreshtoken");
    const newAccessToken = generateAccessToken({
      id: user.id,
      name: user.firstName,
      role: rows[0].role,
    });

    res.json({ newAccessToken });
  } catch (error) {
    res.status(500).json({ error: "Error refreshing token" });
  }
};

// Logout (delete refresh token)
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

const checkToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET || "myrefreshtoken"
    );
    console.log(user);

    return res.status(200).json({ message: "Token valid", user });
  } catch (error) {
    return res.sendStatus(403);
  }
};

export { checkToken, login, logout, refreshToken, register };
