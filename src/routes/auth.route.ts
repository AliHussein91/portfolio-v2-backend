import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { authenticate } from "../utils/authentication";

const router = Router()

// Register a new user
router.post('/register', authenticate, registerUser);

// Login and generate JWT
router.post('/login', loginUser);

export const AuthRouter = router