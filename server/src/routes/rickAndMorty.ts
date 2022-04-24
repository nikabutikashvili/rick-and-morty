import express from "express";

const router = express.Router();

import { getCharacters } from "./../controllers/rickAndMorty/characters";
import { getCharacter } from "../controllers/rickAndMorty/character";

router.get("/characters", getCharacters);
router.get("/characters/:id", getCharacter);
export default router;
