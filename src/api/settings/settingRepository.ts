import { Settings } from "@/database/models/Settings";
import type { SettingType } from "./settingModel";

export class SettingsRepository {
  async saveSettings(userId: number, settings: SettingType): Promise<string> {
    const existingSettings = await Settings.findOne({ where: { userId } });
    console.log("🚀 ~ SettingsRepository ~ saveSettings ~ existingSettings:", userId, settings);
    if (existingSettings) existingSettings.update(settings);
    return "Updated settings...";
  }
}
