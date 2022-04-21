import express from "express";
const router = express.Router();

import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { signUp } from "../controllers/auth/signUp";

router.post("/login", login);
router.post("/logout", logout);
router.post("/sign-up", signUp);
export default router;
