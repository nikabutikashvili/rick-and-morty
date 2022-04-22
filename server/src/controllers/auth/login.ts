import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { extractStringEnvVar } from "../../tools/utils";

const { user } = new PrismaClient();
const JWT_KEY: string = extractStringEnvVar("JWT_KEY");

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const validUser = await user.findUnique({
    where: {
      email,
    },
  });
  if (!validUser) {
    return res.status(404).send({
      message: "User does not exist",
    });
  }

  const checkPassword = bcrypt.compareSync(password, validUser.password);
  if (!checkPassword) {
    return res.status(404).send({
      message: "Username or password not valid",
    });
  }

  const token = jwt.sign(
    {
      userId: validUser.id,
      firstName: validUser.first_name,
      lastName: validUser.last_name,
    },
    JWT_KEY,
    {
      expiresIn: 600,
    }
  );

  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: true,
    })
    .status(200)
    .json({
      message: "Logged in successfully",
      user: {
        firstName: validUser.first_name,
        lastName: validUser.last_name,
      },
    });
};
