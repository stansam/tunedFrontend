import React from "react";
import { AlertCircle } from "lucide-react";

interface LoginFieldProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly children: React.ReactNode;
  readonly rightLabel?: React.ReactNode;
}

export function LoginField({ id, label, error, children, rightLabel }: LoginFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        {rightLabel}
      </div>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-xs text-red-500"
        >
          <AlertCircle size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
