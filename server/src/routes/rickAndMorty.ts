import express from "express";

const router = express.Router();

import { getCharacters } from "./../controllers/rickAndMorty/characters";
import { getCharacter } from "../controllers/rickAndMorty/character";
import { toggleFavorite } from "../controllers/rickAndMorty/favorite";

router.get("/characters", getCharacters);
router.get("/characters/:id", getCharacter);
router.post("/characters/:id/favorite", toggleFavorite);
export default router;
