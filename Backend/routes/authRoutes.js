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
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/logout-all", protect, logoutAll);

router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.json({ message: "Access granted to admin route" });
});

export default router;
