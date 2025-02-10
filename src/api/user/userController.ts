import type { Request, RequestHandler, Response } from "express";

import { userService } from "@/api/user/userService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { UserRequest } from "./userModel";

class UserController {
  public getUsers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public getUser: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await userService.findById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public createUser: RequestHandler = async (req: Request, res: Response) => {
    console.log("createUser", req.body);
    const serviceResponse = await userService.createUser(req.body as UserRequest);
    return handleServiceResponse(serviceResponse, res);
  };

  public deleteAllusers: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await userService.deleteAll();
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
