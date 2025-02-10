import { AuthHeaderSchema } from "@/api/auth/authModel";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../utils/envConfig";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
  const parsedHeaders = AuthHeaderSchema.parse(req.headers);
  const authHeader = parsedHeaders.authorization;
  const token = authHeader.split(" ")[1]; // Extract the token from the Bearer scheme
  if (!token) return res.status(403).send("Token is required");
  jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token");
    req.user = decoded as JwtPayload | string;
    console.log("🚀 ~ jwt.verify ~ decoded:", decoded);
    next();
  });
};
