import { z } from "zod";
import { loginFormSchema } from "../LoginForm/schema";

export const nameSchema = z.string({ message: "Name is required" });

export const registerFormSchema = z
  .object({
    name: nameSchema,
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .merge(loginFormSchema)
  .refine((data) => data.password === data.confirmPassword, {
    message:
      "The password and password confirmation you filled out did not match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
