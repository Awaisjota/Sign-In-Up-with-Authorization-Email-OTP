import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";

// -------------------- REGISTER --------------------
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash });

    // 🔹 Fix: Send user + accessToken
    const accessToken = generateAccessToken(newUser);

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role || "user",
      },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------- LOGIN --------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 🔹 Fix: Send user + accessToken
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
      accessToken,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------- REFRESH TOKEN --------------------
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.tokenVersion !== decoded.tokenVersion)
      return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
      accessToken: newAccessToken,
    });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

// -------------------- LOGOUT ALL --------------------
export const logoutAll = async (req, res) => {
  try {
    req.user.tokenVersion += 1;
    req.user.refreshToken = null;
    await req.user.save();

    res.clearCookie("refreshToken");
    res.json({ message: "Logged out from everywhere" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------- FORGOT PASSWORD --------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.sendStatus(404);

    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp.toString();
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendEmail(
      user.email,
      "Your OTP for password reset",
      `Hello ${user.name},\n\n Your OTP is : ${otp}\n\n It will expire in 10 minutes`
    );

    res.json({ message: "OTP sent to email", otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------- RESET PASSWORD --------------------
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp.toString() || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    user.tokenVersion += 1; // invalidate old tokens
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
