import { apiPost } from "@/api-client";
import { RegisterFormSchema, RegisterSuccessDataSchema, RegisterFieldErrorsSchema } from "@/lib/schemas/register.schema";
import type { RegisterFormValues, RegisterResult } from "@/lib/types/register.type";

export async function submitRegistration(
  values: RegisterFormValues
): Promise<RegisterResult> {

  const validated = RegisterFormSchema.safeParse(values);

  if (!validated.success) {
    const flat = validated.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: {
        username: flat.username?.[0],
        name: flat.name?.[0],
        gender: flat.gender?.[0],
        password: flat.password?.[0],
        confirmPassword: flat.confirmPassword?.[0],
        email: flat.email?.[0],
        phone: flat.phone?.[0],
      },
      status: "VALIDATION_ERROR",
    };
  }

  const result = await apiPost<unknown>("/auth/register", {
    username: validated.data.username,
    name: validated.data.name,
    gender: validated.data.gender,
    password: validated.data.password,
    email: validated.data.email,
    phone: validated.data.phone,
  });

  if (!result.ok) {
    const { message, errors, status } = result.error;

    const parsedErrors = RegisterFieldErrorsSchema.safeParse(errors);
    const fieldErrors  = parsedErrors.success ? parsedErrors.data : {};

    return {
      ok: false,
      message,
      fieldErrors: {
        username: fieldErrors.username?.[0],
        name: fieldErrors.name?.[0],
        gender: fieldErrors.gender?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
      },
      status,
    };
  }

  const successData = RegisterSuccessDataSchema.safeParse(result.data);

  if (!successData.success && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Register] Unexpected success data shape (non-critical):",
      successData.error.format()
    );
  }

  return { ok: true };
}
