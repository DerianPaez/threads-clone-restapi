import { Router } from "express";
import {
  loginUser,
  registerUser,
  validateToken,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/validate-token", [verifyToken], validateToken);

export default router;
