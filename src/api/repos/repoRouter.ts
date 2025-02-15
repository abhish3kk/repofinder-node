import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { repoController } from "./repoController";
import { GitHubRepositorySchema, GitHubSearchParamsSchema, StarredRepoSchema } from "./repoModel";

export const repoRegistry = new OpenAPIRegistry();
export const repoRouter: Router = express.Router();

repoRegistry.registerPath({
  method: "post",
  path: "/repos",
  tags: ["Github Repos"],
  request: {
    body: {
      description: "Request to get repos",
      required: true,
      content: {
        "application/json": {
          schema: GitHubSearchParamsSchema.openapi("GitHubSearchParamsSchema"),
        },
      },
    },
  },
  responses: createApiResponse(z.array(GitHubRepositorySchema), "Succcess"),
});

repoRouter.post("/", repoController.getRepos);

repoRegistry.registerPath({
  method: "get",
  path: "/repos/starred",
  tags: ["Github Repos"],
  responses: createApiResponse(z.array(StarredRepoSchema), "Succcess"),
});

repoRouter.get("/starred", repoController.getStarredRepos);
