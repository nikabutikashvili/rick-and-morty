import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const { favorite } = new PrismaClient();

export const toggleFavorite = async (req: any, res: Response) => {
  const { id } = req.params;
  if (Number.isNaN(Number(id))) {
    res.status(400).send({
      message: "Invalid ID",
    });
  }

  const characterId = Number(id);
  const userId = req.userId;

  const alreadyFavorited = await favorite.findFirst({
    where: {
      user_id: userId,
      character_id: characterId,
    },
  });

  if (alreadyFavorited) {
    try {
      await favorite.deleteMany({
        where: {
          character_id: characterId,
          user_id: userId,
        },
      });
    } catch {
      res.status(500).send({
        message: "Something went wrong",
      });
    }
  } else {
    try {
      await favorite.create({
        data: {
          user_id: userId,
          character_id: characterId,
        },
      });
    } catch (e) {
      return res.status(500).send({
        message: "Something went wrong",
      });
    }
  }
  res.status(200).send();
};
