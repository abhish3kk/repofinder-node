import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),
});

export type UserRequest = z.infer<typeof UserRequestSchema>;
export const UserRequestSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  password: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const CreateUserRequestSchema = z.object({
  firstname: commonValidations.firstname.openapi({ example: "John" }),
  lastname: commonValidations.lastname.openapi({ example: "Doe" }),
  username: commonValidations.username.openapi({ example: "john" }),
  password: commonValidations.password.openapi({ example: "password" }),
});

export const CreateUserResponseSchema = z.string().openapi({ example: "jwt-token-string" });

export const DeleteUsersResponseSchema = z.string().openapi({ example: "Deleted All Records" });
