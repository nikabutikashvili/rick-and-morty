import { getCharacterService } from "./../../services/rickAndMorty/index";
import { Request, Response } from "express";

export const getCharacter = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (Number.isNaN(Number(id))) {
    res.status(400).send({
      message: "Invalid ID",
    });
  }
  let character;
  try {
    character = await getCharacterService(id);
    res.status(200).send(character);
  } catch {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
};
