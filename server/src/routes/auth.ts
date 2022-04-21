import express from "express";
const router = express.Router();

import { signUp } from "../controllers/auth/signUp";

router.post("/sign-up", signUp);
export default router;
