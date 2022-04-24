import { getCharactersService } from "./../../services/rickAndMorty/index";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { favorite } = new PrismaClient();

export const getCharacters = async (req: any, res: Response) => {
  const userId = req.userId;
  const characters = await getCharactersService();
  const favorites = await favorite.findMany({
    where: {
      user_id: userId,
    },
  });
  characters.forEach((character: any) => {
    if (favorites.find((favorite) => favorite.character_id === character.id)) {
      character.isFavorited = true;
    } else {
      character.isFavorited = false;
    }
  });
  res.status(200).send(characters);
};
