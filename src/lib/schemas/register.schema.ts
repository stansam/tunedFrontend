import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username is too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .transform((v) => v.trim()),

  name: z
    .string()
    .min(1, "Full Name is required")
    .max(100, "Name is too long")
    .transform((v) => v.trim()),

  gender: z
    .enum(["M", "F", ""], { message: "Please select a gender" })
    .refine((val) => val !== "", { message: "Please select a gender" }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password is too long"),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .transform((v) => v.trim()),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => {
      try {
        return isValidPhoneNumber(val);
      } catch {
        return false;
      }
    }, { message: "Invalid international phone number" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormInput = z.infer<typeof RegisterFormSchema>;

export const RegisterSuccessDataSchema = z.object({
  email: z.string().email(),
});

export type RegisterSuccessData = z.infer<typeof RegisterSuccessDataSchema>;

export const RegisterFieldErrorsSchema = z
  .object({
    username: z.array(z.string()).optional(),
    name: z.array(z.string()).optional(),
    gender: z.array(z.string()).optional(),
    password: z.array(z.string()).optional(),
    confirmPassword: z.array(z.string()).optional(),
    email: z.array(z.string()).optional(),
    phone: z.array(z.string()).optional(),
    "": z.array(z.string()).optional(),
  })
  .passthrough();

export type RegisterApiFieldErrors = z.infer<typeof RegisterFieldErrorsSchema>;
