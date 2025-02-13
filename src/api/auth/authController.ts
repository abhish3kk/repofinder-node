import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import type { User } from "../user/userModel";
import { userService } from "../user/userService";

class AuthController {
  public getUserDetails: RequestHandler = async (req: Request, res: Response) => {
    const userId = (req.user as User).id;
    const serviceResponse = await userService.findById(userId);
    return handleServiceResponse(serviceResponse, res);
  };

  public authenticateUser: RequestHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const response = await userService.findUser(username, password);

    return handleServiceResponse(response, res);
  };
}

export const authController = new AuthController();
