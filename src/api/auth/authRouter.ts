import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { verifyToken } from "@/common/middleware/verifyToken";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { UserSchema } from "../user/userModel";
import { authController } from "./authController";
import { AuthHeaderSchema } from "./authModel";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.registerPath({
  method: "get",
  path: "/user-details",
  request: {
    headers: AuthHeaderSchema,
  },
  tags: ["Auth"],
  responses: createApiResponse(UserSchema, "success"),
});

authRouter.get("/", verifyToken, authController.getUserDetails);
