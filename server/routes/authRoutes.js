import { Router } from "express";
import { register, login } from "../controllers/authControllers.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, register);

export default router;
