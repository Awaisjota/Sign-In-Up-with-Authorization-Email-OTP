import { body } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name is must be at least 3 charachters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid Email!")
    .trim()
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*()<>,."::{}|?]/)
    .withMessage("Password must contain at least one special character"),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email")
    .trim()
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

export const forgotValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email")
    .trim()
    .normalizeEmail(),
];

export const resetValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Invalid email")
    .trim()
    .normalizeEmail(),

  body("otp")
    .notEmpty()
    .withMessage("OTP is required!")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be 6 characters"),
  body("newPassword")
    .notEmpty()
    .withMessage("New Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*()<>,."::{}|?]/)
    .withMessage("Password must contain at least one special character")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email }).select(
        "+password"
      );
      if (!user) throw new Error("User not found");

      const isSame = await bcrypt.compare(value, user.password);
      if (isSame) {
        throw new Error("New password cannot be same as old password");
      }
      return true;
    }),
];
