import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type SettingType = z.infer<typeof SettingSchema>;

export const SettingSchema = z.object({
  topics: commonValidations.topics.openapi({ example: "react, vue" }),
  perPage: commonValidations.perPage.openapi({ example: 5 }),
  starGazers: commonValidations.starGazers.openapi({ example: "stars:50..100" }),
  sort: commonValidations.sort.openapi({ example: "updated" }),
  order: commonValidations.order.openapi({ example: "desc" }),
  languages: commonValidations.languages.openapi({ example: "typescript" }),
});
