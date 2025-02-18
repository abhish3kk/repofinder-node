import { commonValidations } from "@/common/utils/commonValidation";
import { z } from "zod";

export type AuthHeader = z.infer<typeof AuthHeaderSchema>;

export const AuthHeaderSchema = z.object({
  authorization: z
    .string()
    .refine((value) => value.startsWith("Bearer "), {
      message: "Invalid Authorization header",
    })
    .openapi({
      description: "Include a Bearer token in the 'Authorization' header. For example: 'Bearer YOUR_TOKEN_HERE'",
    }),
});

export const LoginRequestUserSchema = z.object({
  username: commonValidations.username.openapi({ example: "john" }),
  password: commonValidations.password.openapi({ example: "password" }),
});
