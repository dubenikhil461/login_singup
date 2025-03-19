import User from "../models/usermodels.js"; 
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

// Register User
export const signup = async (req, res) => {  
  const { name, email, password } = req.body;
  try {
    const userexist = await User.findOne({ email });
    if (userexist)
      return res.status(400).json({ message: "User already exists" });
    const user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Controller
export const login = async (req, res) => { 
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forget Password Controller
export const forgotpassword = async (req, res) => {  
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resettoken = generateToken(user.id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      text: `To reset your password, click this link: ${resettoken}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
