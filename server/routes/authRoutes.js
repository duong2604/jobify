import { Router } from "express";
import { register, login, logout } from "../controllers/authControllers.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

const router = Router();

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.post("/logout", logout);

export default router;
