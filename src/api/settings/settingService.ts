import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import type { SettingType } from "./settingModel";
import { SettingsRepository } from "./settingRepository";

export class SettingsService {
  private settingsRepository: SettingsRepository;

  constructor(repository: SettingsRepository = new SettingsRepository()) {
    this.settingsRepository = repository;
  }

  async saveSettings(userId: number, settings: SettingType): Promise<ServiceResponse<string | null>> {
    try {
      const response = await this.settingsRepository.saveSettings(userId, settings);
      return ServiceResponse.success<string>("Updated Settings", response);
    } catch (error) {
      const errorMessage = `Error updating settings ${error}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const settingsService = new SettingsService();
