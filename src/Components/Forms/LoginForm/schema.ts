import { z } from "zod";

export const passwordSchema = z
  .string({ message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[a-z]/, {
    message: "Password must contain at least 1 lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least 1 uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least 1 number" });

export const emailSchema = z
  .string({ message: "Email is required" })
  .email({ message: "Invalid email format" });

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
