import express from "express";

import {
  forgotPassword,
  login,
  logoutAll,
  refreshToken,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import {
  forgotValidation,
  loginValidation,
  registerValidation,
  resetValidation,
} from "../validators/validators.js";
const router = express.Router();
import { validate } from "../middleware/validate.js";
router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);
router.post("/refresh", refreshToken);
router.post("/forgot-password", forgotValidation, validate, forgotPassword);
router.post("/reset-password", resetValidation, validate, resetPassword);

router.post("/logout-all", protect, logoutAll);

router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.json({ message: "Access granted to admin route" });
});

export default router;
