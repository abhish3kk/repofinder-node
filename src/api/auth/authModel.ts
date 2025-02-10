import { z } from "zod";

export type AuthHeader = z.infer<typeof AuthHeaderSchema>;

export const AuthHeaderSchema = z.object({
  authorization: z.string().refine((value) => value.startsWith("Bearer "), {
    message: "Authorization header must start with 'Bearer '",
  }),
});
