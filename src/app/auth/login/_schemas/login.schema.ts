import { z } from "zod";

export const LoginFormSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or username is required")
    .max(254, "Email or username is too long")
    .transform((v) => v.trim()),

  password: z
    .string()
    .min(1, "Password is required")
    .max(256, "Password is too long"),

  rememberMe: z.boolean().default(false),
});

export type LoginFormInput = z.infer<typeof LoginFormSchema>;

export const LoginSuccessDataSchema = z
  .object({
    redirect_to: z.string().optional(),
  })
  .passthrough()
  .nullable()
  .optional();

export type LoginSuccessData = z.infer<typeof LoginSuccessDataSchema>;

export const LoginFieldErrorsSchema = z
  .object({
    identifier: z.array(z.string()).optional(),
    password:   z.array(z.string()).optional(),
    "":         z.array(z.string()).optional(),
  })
  .passthrough();

export type LoginApiFieldErrors = z.infer<typeof LoginFieldErrorsSchema>;