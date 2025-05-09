import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cookieParser());

app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
