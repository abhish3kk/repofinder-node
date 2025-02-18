import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);
export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  username: z.string().min(1),
  password: z.string().openapi({ format: "password" }).min(1),
  topics: z.string(),
  perPage: z.number(),
  starGazers: z.string(),
  sort: z.string(),
  order: z.string(),
  languages: z.string(),
};
