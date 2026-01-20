import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
connectDB();
const app = express();
// Allow frontend origin
app.use(
  cors({
    origin: "https://awaisjotasigninup.netlify.app", // remove trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runing on http://localhost:${PORT}`);
});
