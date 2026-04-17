import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegisterFieldProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly children: React.ReactNode;
  readonly rightLabel?: React.ReactNode;
  readonly required?: boolean;
  readonly className?: string;
}

export function RegisterField({ id, label, error, children, rightLabel, required, className }: RegisterFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
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
