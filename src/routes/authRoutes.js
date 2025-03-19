import express from "express";
import { signup, login, forgotpassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup); // <== Ensure this line exists
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);

export default router;
