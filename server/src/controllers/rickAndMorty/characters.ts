import { getCharactersService } from "./../../services/rickAndMorty/index";
import { Request, Response } from "express";

export const getCharacters = async (req: Request, res: Response) => {
  const characters = await getCharactersService();
  res.status(200).send(characters);
};
