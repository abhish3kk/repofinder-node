import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import type { User } from "../user/userModel";
import type { SettingType } from "./settingModel";
import { settingsService } from "./settingService";

class SettingsController {
  public saveSettings: RequestHandler = async (req: Request, res: Response) => {
    const userId = (req.user as User).id;
    const settings = req.body as SettingType;
    const serviceResponse = await settingsService.saveSettings(userId, settings);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const settingsController = new SettingsController();
