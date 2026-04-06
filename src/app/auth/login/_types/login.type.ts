export interface LoginFormValues {
  readonly identifier: string;
  readonly password: string;
  readonly rememberMe: boolean;
}

export type LoginFieldErrors = Partial<
  Record<keyof Omit<LoginFormValues, "rememberMe">, string>
>;


export type LoginResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly message: string;
      readonly fieldErrors?: LoginFieldErrors;
      readonly status: number | string;
    };

export type LoginFormStatus =
  | "idle"        // Initial state — no submission attempted
  | "submitting"  // POST /api/auth/login in flight
  | "success"     // Login accepted — redirect pending
  | "error";      // Login rejected — error shown

export interface LoginFormState {
  readonly status: LoginFormStatus;
  readonly globalError: string | null;
  readonly fieldErrors: LoginFieldErrors;
}

export interface LoginFormProps {
  readonly callbackUrl: string;
}

export interface LoginLeftPanelProps {
  readonly showIllustration?: boolean;
}