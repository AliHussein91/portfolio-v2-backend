import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { authenticate } from "../utils/authentication";
import { logoutUser } from "../controllers/auth.controller";

const router = Router()


router.post('/register', authenticate, registerUser);

// Login and generate JWT
router.post('/login', loginUser);

// Logout and blacklist token
router.post('/logout', authenticate, logoutUser);

export const AuthRouter = router