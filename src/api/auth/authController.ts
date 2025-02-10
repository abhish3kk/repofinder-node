import { ServiceResponse } from "@/common/models/serviceResponse";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import { UserModel } from "@/database/models/User";
import type { Request, RequestHandler, Response } from "express";
import type { User } from "../user/userModel";

class AuthController {
  constructor() {
    console.log("AuthController instance");
  }
  public getUserDetails: RequestHandler = async (req: Request, res: Response) => {
    const userFromDB = await UserModel.findByPk((req.user as User).id);
    const user: User = {
      id: userFromDB!.id,
      firstname: userFromDB!.firstname,
      lastname: userFromDB!.lastname,
      username: userFromDB!.username,
      createdAt: userFromDB!.createdAt,
      modifiedAt: userFromDB!.modifiedAt,
    };
    return handleServiceResponse(ServiceResponse.success<User>("Fetched user", user), res);
  };
}

export const authController = new AuthController();
