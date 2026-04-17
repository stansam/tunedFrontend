import React from "react";
import ReactPhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  id?: string;
  value: string;
  onChange: (value: string | undefined) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: boolean;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export function PhoneInput({
  id,
  value,
  onChange,
  onBlur,
  disabled,
  error,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: PhoneInputProps) {
  return (
    <div
      className={cn(
        "flex h-11 w-full items-center rounded-xl border bg-white px-3 text-sm transition-all duration-150 relative",
        error
          ? "border-red-300 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
          : "border-slate-200 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <style suppressHydrationWarning>{`
        .PhoneInput {
          width: 100%;
          display: flex;
          align-items: center;
        }
        .PhoneInputCountry {
          margin-right: 0.5rem;
          padding-right: 0.5rem;
          border-right: 1px solid #e2e8f0;
        }
        .PhoneInputCountryIcon {
          width: 1.5rem;
          height: 1.1rem;
          box-shadow: none;
          background-color: transparent;
        }
        .PhoneInputCountryIcon--border {
          box-shadow: none;
          border-radius: 2px;
        }
        .PhoneInputInput {
          flex: 1;
          min-width: 0;
          outline: none;
          background: transparent;
          color: #1e293b;
          font-size: 0.875rem;
          line-height: 1.25rem;
          padding: 0;
          border: none;
        }
        .PhoneInputInput::placeholder {
          color: #94a3b8;
        }
      `}</style>
      <ReactPhoneInput
        international
        defaultCountry="US"
        value={value}
        onChange={onChange}
        id={id}
        onBlur={onBlur}
        disabled={disabled}
        numberInputProps={{
          "aria-invalid": ariaInvalid,
          "aria-describedby": ariaDescribedBy,
          className: "PhoneInputInput",
        }}
      />
    </div>
  );
}
