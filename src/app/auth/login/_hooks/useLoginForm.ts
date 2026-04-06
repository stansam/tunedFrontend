import { useState, useCallback, useId, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { LoginFormSchema } from "../_schemas/login.schema";
import { submitLogin } from "@/lib/services/login.service";
import type { LoginFormValues, LoginFormStatus, LoginFieldErrors } from "../_types/login.type";
import { sanitizeCallbackUrl } from "../_utils/login.util";

export function useLoginForm(callbackUrl: string) {
  const router = useRouter();
  const { refresh } = useAuth();
  const formId = useId();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState<LoginFormStatus>("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSuccess = formStatus === "success";

  const validateField = useCallback(
    (field: keyof Omit<LoginFormValues, "rememberMe">, value: string) => {
      const result = LoginFormSchema.shape[field].safeParse(value);
      setFieldErrors((prev) => ({
        ...prev,
        [field]: result.success ? undefined : result.error.issues[0]?.message,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting || isSuccess) return;

      const validated = LoginFormSchema.safeParse({ identifier, password, rememberMe });
      if (!validated.success) {
        const flat = validated.error.flatten().fieldErrors;
        setFieldErrors({ identifier: flat.identifier?.[0], password: flat.password?.[0] });
        return;
      }

      setIsSubmitting(true);
      setFormStatus("submitting");
      setGlobalError(null);
      setFieldErrors({});

      const result = await submitLogin({ identifier, password, rememberMe });
      if (!result.ok) {
        setFormStatus("error");
        setGlobalError(result.message);
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        setIsSubmitting(false);
        return;
      }

      setFormStatus("success");
      try {
        await refresh();
      } catch {}
      router.push(sanitizeCallbackUrl(callbackUrl) as never);
    },
    [identifier, password, rememberMe, isSubmitting, isSuccess, refresh, router, callbackUrl]
  );

  return {
    formId, identifier, setIdentifier, password, setPassword, rememberMe, setRememberMe, showPassword, setShowPassword, formStatus, globalError, fieldErrors, isSubmitting, isSuccess, validateField, handleSubmit
  };
}
