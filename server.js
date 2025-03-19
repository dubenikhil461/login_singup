import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config({ path: ".env" });
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});