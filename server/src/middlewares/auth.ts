import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { extractStringEnvVar } from "../tools/utils";

const JWT_KEY: string = extractStringEnvVar("JWT_KEY");

interface JwtPayload {
  userId: number;
}

export const authorization = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const { userId } = jwt.verify(token, JWT_KEY) as JwtPayload;
    req.userId = userId;
    return next();
  } catch {
    return res.sendStatus(401);
  }
};
