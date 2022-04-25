import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validateEmail } from "../../utils";

const { user } = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
    });
  }

  if (password.length < 8) {
    return res.status(400).send({
      message: "Password should be at least 8 characters",
    });
  }

  if (!firstName) {
    return res.status(400).send({
      message: "Invalid firstname",
    });
  }

  if (!lastName) {
    return res.status(400).send({
      message: "Invalid lastname",
    });
  }

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
