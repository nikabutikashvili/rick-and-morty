import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { extractStringEnvVar } from "../tools/utils";

const JWT_KEY: string = extractStringEnvVar("JWT_KEY");

interface JwtPayload {
  id: number;
}

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const { id } = jwt.verify(token, JWT_KEY) as JwtPayload;
    req.userId = id;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
