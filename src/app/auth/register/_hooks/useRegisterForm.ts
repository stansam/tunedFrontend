import { useState, useCallback, useId, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { RegisterFormSchema } from "@/lib/schemas/register.schema";
import { submitRegistration } from "@/lib/services/register.service";
import type { RegisterFormValues, RegisterFormStatus, RegisterFieldErrors } from "@/lib/types/register.type";
import { sanitizeCallbackUrl } from "@/app/auth/login/_utils/login.util";

export function useRegisterForm(callbackUrl: string) {
  const router = useRouter();
  const formId = useId();

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    username: "",
    name: "",
    gender: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formStatus, setFormStatus] = useState<RegisterFormStatus>("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSuccess = formStatus === "success";

  const handleChange = useCallback(
    (field: keyof RegisterFormValues, value: string) => {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const validateField = useCallback(
    (field: keyof RegisterFormValues) => {
      let errorMsg: string | undefined = undefined;

      const currentValues = field === "confirmPassword" ? formValues : formValues;
      const result = RegisterFormSchema.safeParse(currentValues);
      
      if (!result.success) {
         errorMsg = result.error.flatten().fieldErrors[field]?.[0];
      }

      setFieldErrors((prev) => ({
        ...prev,
        [field]: errorMsg,
      }));
    },
    [formValues]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting || isSuccess) return;

      const validated = RegisterFormSchema.safeParse(formValues);
      
      if (!validated.success) {
        const flat = validated.error.flatten().fieldErrors;
        setFieldErrors({
          username: flat.username?.[0],
          name: flat.name?.[0],
          gender: flat.gender?.[0],
          password: flat.password?.[0],
          confirmPassword: flat.confirmPassword?.[0],
          email: flat.email?.[0],
          phone: flat.phone?.[0],
        });
        return;
      }

      setIsSubmitting(true);
      setFormStatus("submitting");
      setGlobalError(null);
      setFieldErrors({});

      const result = await submitRegistration(formValues);
      if (!result.ok) {
        setFormStatus("error");
        setGlobalError(result.message);
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        setIsSubmitting(false);
        return;
      }

      setFormStatus("success");
      setIsSubmitting(false);
      router.push(sanitizeCallbackUrl(callbackUrl) as never);
    },
    [formValues, isSubmitting, isSuccess, router, callbackUrl]
  );

  return {
    formId,
    formValues,
    handleChange,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    formStatus,
    globalError,
    fieldErrors,
    isSubmitting,
    isSuccess,
    validateField,
    handleSubmit,
  };
}
