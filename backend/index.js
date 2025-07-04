import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import riderRoutes from "./routes/riderRoutes.js";
import ridesRoutes from "./routes/ridesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import chatSocket from "./sockets/chatSocket.js";

dotenv.config();
const app = express();

const port = 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// CORS configuration for frontend to access backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes for authentication and user management
app.use("/api/auth", authRoutes);

// Routes for rides management
app.use("/api/rides", ridesRoutes);

// Routes for payment processing
app.use("/api/payment", paymentRoutes);

// Routes for booking management
app.use("/api/booking", bookingRoutes);

// Routes for chat functionality
app.use("/api/chat", chatRoutes);

// Routes for driver management
app.use("/api/driver", driverRoutes);

// Routes for rider management
app.use("/api/rider", riderRoutes);

// Routes for admin management
app.use("/api/admin", adminRoutes);

chatSocket(io);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
server.listen(port, () => {
  console.log("===============================================");
  console.log(`\n  Server is running at http://localhost:${port}\n`);
  console.log("===============================================");
});
