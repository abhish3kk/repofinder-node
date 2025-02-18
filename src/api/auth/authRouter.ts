import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { verifyToken } from "@/common/middleware/verifyToken";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { UserSchema } from "../user/userModel";
import { authController } from "./authController";
import { AuthHeaderSchema, LoginRequestUserSchema } from "./authModel";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.register("Login Request Schema", LoginRequestUserSchema);

authRegistry.registerPath({
  method: "get",
  path: "/auth",
  security: [{ Authorization: [] }],
  tags: ["Auth"],
  responses: createApiResponse(UserSchema, "success"),
});

authRouter.get("/", verifyToken, authController.getUserDetails);

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  request: {
    body: {
      description: "Request to login user",
      required: true,
      content: {
        "application/json": {
          schema: LoginRequestUserSchema.openapi("LoginRequestUserSchema"),
        },
      },
    },
  },
  tags: ["Auth"],
  responses: createApiResponse(UserSchema, "success"),
});

authRouter.post("/login", authController.authenticateUser);
