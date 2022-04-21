import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const { user } = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const userExists = await user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });

  if (userExists) {
    return res.status(400).send({
      message: "User with this email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await user.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      },
    });
  } catch {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }

  res.status(201).send({
    message: "User successfully created",
  });
};
