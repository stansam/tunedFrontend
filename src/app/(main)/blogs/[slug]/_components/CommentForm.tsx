"use client";

import { useState } from "react";
import { Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommentFormSchema } from "@/lib/schemas/post.schema";
import type { CommentFormProps } from "../_props/post.prop";
import type { CommentFormValues } from "../_types/post.type";
import { submitComment } from "@/lib/services/post.service";

type FieldErrors = Partial<Record<keyof CommentFormValues, string>>;

const EMPTY_FORM: CommentFormValues = { name: "", email: "", content: "" };

export function CommentForm({ postSlug, onSuccess }: CommentFormProps) {
  const [values, setValues] = useState<CommentFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const set = (field: keyof CommentFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [field]: val }));
    // Clear field error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const result = CommentFormSchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const flat = result.error.flatten().fieldErrors;
    setErrors({
      name: flat.name?.[0],
      email: flat.email?.[0],
      content: flat.content?.[0],
    });
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitComment(postSlug, values);

    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error.message);
      return;
    }

    setSubmitSuccess(true);
    setValues(EMPTY_FORM);
    onSuccess(result.data);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  if (submitSuccess) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl py-10 px-6",
        "border border-emerald-200 bg-emerald-50/50 text-center"
      )}>
        <CheckCircle2 size={36} className="text-emerald-500" aria-hidden="true" />
        <p className="font-semibold text-slate-700">Comment submitted!</p>
        <p className="text-sm text-slate-500 max-w-xs">
          Your comment is pending review and will appear once approved.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Leave a comment"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
    >
      <h3 className="text-base font-bold text-slate-800 mb-4">Leave a comment</h3>

      {submitError && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5"
        >
          <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="comment-name"
            className="mb-1.5 block text-xs font-semibold text-slate-600"
          >
            Name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="comment-name"
            type="text"
            value={values.name}
            onChange={set("name")}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(
              "w-full rounded-lg border px-3 py-2.5 text-sm text-slate-700 outline-none",
              "bg-white placeholder:text-slate-300 transition-all",
              errors.name
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            )}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="comment-email"
            className="mb-1.5 block text-xs font-semibold text-slate-600"
          >
            Email <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="comment-email"
            type="email"
            value={values.email}
            onChange={set("email")}
            placeholder="your@email.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              "w-full rounded-lg border px-3 py-2.5 text-sm text-slate-700 outline-none",
              "bg-white placeholder:text-slate-300 transition-all",
              errors.email
                ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            )}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="comment-content"
          className="mb-1.5 block text-xs font-semibold text-slate-600"
        >
          Comment <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="comment-content"
          value={values.content}
          onChange={set("content")}
          placeholder="Share your thoughts..."
          rows={4}
          maxLength={2000}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? "content-error" : "content-count"}
          className={cn(
            "w-full resize-none rounded-lg border px-3 py-2.5 text-sm text-slate-700 outline-none",
            "bg-white placeholder:text-slate-300 transition-all",
            errors.content
              ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          )}
        />
        <div className="flex items-start justify-between mt-1">
          {errors.content ? (
            <p id="content-error" role="alert" className="text-xs text-red-500">
              {errors.content}
            </p>
          ) : (
            <span />
          )}
          <p
            id="content-count"
            className={cn(
              "text-xs tabular-nums",
              values.content.length > 1800 ? "text-red-400" : "text-slate-300"
            )}
            aria-live="polite"
          >
            {values.content.length}/2000
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "mt-4 flex w-full items-center justify-center gap-2",
          "rounded-full bg-emerald-500 hover:bg-emerald-600",
          "px-6 py-3 text-sm font-semibold text-white",
          "shadow-[0_4px_12px_rgba(16,185,129,0.25)] transition-all",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Post comment
          </>
        )}
      </button>
    </form>
  );
}