import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import type { GitHubSearchParams } from "./repoModel";
import { repoService } from "./repoServices";

class RepoController {
  public getRepos: RequestHandler = async (req: Request, res: Response) => {
    const params = req.body as GitHubSearchParams;
    const serviceResponse = await repoService.getRepos(params);
    return handleServiceResponse(serviceResponse, res);
  };

  public getStarredRepos: RequestHandler = async (_: Request, res: Response) => {
    const serviceResponse = await repoService.getStarredRepos();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const repoController = new RepoController();
