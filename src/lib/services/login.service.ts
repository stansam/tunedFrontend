import { apiPost } from "@/api-client";
import { LoginFormSchema, LoginSuccessDataSchema, LoginFieldErrorsSchema } from "@/app/auth/login/_schemas/login.schema";
import type { LoginFormValues, LoginResult } from "@/app/auth/login/_types/login.type";

export async function submitLogin(
  values: LoginFormValues
): Promise<LoginResult> {
  const validated = LoginFormSchema.safeParse(values);

  if (!validated.success) {
    const flat = validated.error.flatten().fieldErrors;
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: {
        identifier: flat.identifier?.[0],
        password:   flat.password?.[0],
      },
      status: "VALIDATION_ERROR",
    };
  }

  const result = await apiPost<unknown>("/auth/login", {
    identifier:  validated.data.identifier,
    password:    validated.data.password,
    remember_me: validated.data.rememberMe,
  });

  if (!result.ok) {
    const { message, errors, status } = result.error;

    const parsedErrors = LoginFieldErrorsSchema.safeParse(errors);
    const fieldErrors  = parsedErrors.success ? parsedErrors.data : {};

    return {
      ok: false,
      message,
      fieldErrors: {
        identifier: fieldErrors.identifier?.[0],
        password:   fieldErrors.password?.[0],
      },
      status,
    };
  }

  const successData = LoginSuccessDataSchema.safeParse(result.data);

  if (!successData.success && process.env.NODE_ENV !== "production") {
    console.warn(
      "[Login] Unexpected success data shape (non-critical):",
      successData.error.format()
    );
  }

  return { ok: true };
}