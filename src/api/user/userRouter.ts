import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  CreateUserRequestSchema,
  CreateUserResponseSchema,
  DeleteUsersResponseSchema,
  GetUserSchema,
  UserRequestSchema,
  UserSchema,
} from "@/api/user/userModel";

import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);
userRegistry.register("User Request", UserRequestSchema);
userRegistry.register("Create User Request", CreateUserRequestSchema);

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", userController.getUsers);

userRegistry.registerPath({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  request: { params: GetUserSchema.shape.params },
  responses: createApiResponse(UserSchema, "Success"),
});

userRouter.post("/create", userController.createUser);

userRegistry.registerPath({
  method: "post",
  path: "/users/create",
  tags: ["User"],
  request: {
    body: {
      description: "Request to create a user",
      required: true,
      content: {
        "application/json": {
          schema: CreateUserRequestSchema.openapi("CreateUserRequest"),
        },
      },
    },
  },
  responses: createApiResponse(CreateUserResponseSchema, "Success"),
});

userRouter.get("/:id", validateRequest(GetUserSchema), userController.getUser);

userRouter.delete("/", userController.deleteAllusers);

userRegistry.registerPath({
  method: "delete",
  path: "/users",
  tags: ["User"],
  request: {},
  responses: createApiResponse(DeleteUsersResponseSchema, "Success"),
});
