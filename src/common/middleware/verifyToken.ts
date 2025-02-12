import { AuthHeaderSchema } from "@/api/auth/authModel";
import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ServiceResponse } from "../models/serviceResponse";
import { env } from "../utils/envConfig";
import { handleServiceResponse } from "../utils/httpHandlers";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
  const parsedHeaders = AuthHeaderSchema.parse(req.headers);
  const authHeader = parsedHeaders.authorization;
  const token = authHeader.split(" ")[1]; // Extract the token from the Bearer scheme
  if (!token) {
    const serviceResponse = ServiceResponse.failure("Token is required", StatusCodes.BAD_REQUEST);
    const response = handleServiceResponse(serviceResponse, res);
    return response;
  }
  jwt.verify(token, env.SECRET_KEY, (err, decoded) => {
    if (err) {
      const serviceResponse = ServiceResponse.failure("Failed to authenticate token", StatusCodes.BAD_REQUEST);
      const response = handleServiceResponse(serviceResponse, res);
      return response;
    }
    req.user = decoded as JwtPayload | string;
    next();
  });
};
