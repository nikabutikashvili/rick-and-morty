import express from "express";
const router = express.Router();

import { getCharacters } from "./../controllers/rickAndMorty/characters";

router.get("/characters", getCharacters);
export default router;
