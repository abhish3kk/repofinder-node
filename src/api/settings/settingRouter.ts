import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { verifyToken } from "@/common/middleware/verifyToken";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { settingsController } from "./settingController";
import { SettingSchema } from "./settingModel";

export const settingsRegistry = new OpenAPIRegistry();
export const settingRouter: Router = express.Router();

settingsRegistry.registerPath({
  method: "put",
  path: "/settings",
  security: [{ Authorization: [] }],
  request: {
    body: {
      description: "Request to login user",
      required: true,
      content: {
        "application/json": {
          schema: SettingSchema.openapi("SettingSchema"),
        },
      },
    },
  },
  tags: ["Settings"],
  responses: createApiResponse(SettingSchema, "success"),
});

settingRouter.put("/", verifyToken, settingsController.saveSettings);
