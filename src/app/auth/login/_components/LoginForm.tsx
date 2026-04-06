"use client";

import { type ChangeEvent } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LoginFormProps } from "../_types/login.type";
import { useLoginForm } from "../_hooks/useLoginForm";
import { LoginField } from "./LoginField";
import { LoginSubmitButton } from "./LoginSubmitButton";

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const {
    formId, identifier, setIdentifier, password, setPassword, rememberMe, setRememberMe,
    showPassword, setShowPassword, formStatus, globalError, fieldErrors,
    isSubmitting, isSuccess, validateField, handleSubmit
  } = useLoginForm(callbackUrl);

  const identifierErrorId = fieldErrors.identifier ? `${formId}-identifier-error` : undefined;
  const passwordErrorId = fieldErrors.password ? `${formId}-password-error` : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Sign in" className="flex flex-col gap-5">
      {globalError && formStatus === "error" && (
        <div role="alert" aria-live="assertive" className="flex items-start gap-3 rounded-xl px-4 py-3 border border-red-200 bg-red-50">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
          <p className="text-sm font-medium text-red-700">{globalError}</p>
        </div>
      )}
      {isSuccess && (
        <div role="status" aria-live="polite" className="flex items-center gap-3 rounded-xl px-4 py-3 border border-emerald-200 bg-emerald-50">
          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium text-emerald-700">Signed in successfully. Redirecting…</p>
        </div>
      )}
      <LoginField id={`${formId}-identifier`} label="Email or Username" error={fieldErrors.identifier}>
        <div className="relative">
          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id={`${formId}-identifier`} type="text" autoComplete="username" autoCapitalize="none" autoCorrect="off" spellCheck={false}
            value={identifier} onChange={(e: ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
            onBlur={() => validateField("identifier", identifier)} placeholder="Email or Username"
            aria-invalid={!!fieldErrors.identifier} aria-describedby={identifierErrorId} disabled={isSubmitting || isSuccess} maxLength={254}
            className={cn("w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed", fieldErrors.identifier ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100" : "border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100")}
          />
        </div>
      </LoginField>
      <LoginField id={`${formId}-password`} label="Password" error={fieldErrors.password} rightLabel={<Link href={{pathname:"/auth/forgot-password"}} className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">Forgot Password?</Link>}>
        <div className="relative">
          <Shield size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id={`${formId}-password`} type={showPassword ? "text" : "password"} autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} onBlur={() => validateField("password", password)}
            placeholder="••••••••••" aria-invalid={!!fieldErrors.password} aria-describedby={passwordErrorId} disabled={isSubmitting || isSuccess} maxLength={256}
            className={cn("w-full rounded-xl border bg-white py-3 pl-10 pr-11 text-sm text-slate-800 placeholder:text-slate-500 outline-none transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed", fieldErrors.password ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100" : "border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100")}
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide" : "Show"} aria-pressed={showPassword} disabled={isSubmitting || isSuccess} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-40">
            {showPassword ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
          </button>
        </div>
      </LoginField>
      <label className="flex cursor-pointer items-center gap-3 select-none">
        <div className="relative flex items-center">
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} disabled={isSubmitting || isSuccess} className="peer sr-only" aria-label="Remember me" />
          <div className={cn("h-5 w-5 rounded border-2 border-slate-300 bg-white transition-all duration-150 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-400 peer-focus-visible:ring-offset-1 peer-disabled:opacity-50")}>
            {rememberMe && <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5" aria-hidden="true"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </div>
        </div>
        <span className="text-sm font-medium text-slate-600">Remember me</span>
      </label>
      <LoginSubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
      <p className="text-center text-sm text-slate-500">Don&apos;t have an account? <Link href={{pathname:"/auth/register"}} className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">Join here</Link></p>
      <p className="text-center text-[11px] leading-relaxed text-slate-400 px-2 mt-[-6px]">
        By signing in, you agree to Tunedessays&apos; <Link href={{pathname:"/terms"}} className="text-emerald-600 hover:underline transition-colors">Terms of Service</Link> and acknowledge our <Link href={{pathname:"/privacy"}} className="text-emerald-600 hover:underline transition-colors">Privacy Policy</Link>.
      </p>
    </form>
  );
}