import { cn } from "@/lib/utils";
import { FALLBACK_FAQS } from "./data";
import { deriveFaqCategories } from "../_types/faq.types";

const FAQ_COUNT      = FALLBACK_FAQS.length;
const CATEGORY_COUNT = deriveFaqCategories(FALLBACK_FAQS).length - 1; // exclude "All"

export function FaqHero() {
  return (
    <section
      aria-labelledby="faq-page-heading"
      className="relative w-full overflow-hidden bg-[#f8f7f4] py-16 md:py-24"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/40 to-transparent"
        aria-hidden="true"
      />

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-8 top-0 select-none",
          "text-[120px] font-extrabold leading-none text-slate-800 opacity-[0.03]",
          "md:text-[200px] lg:text-[280px]"
        )}
      >
        FAQ
      </span>

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full",
          "bg-emerald-400/10 blur-3xl"
        )}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">

          <div className={cn(
            "inline-flex items-center gap-2 rounded-full",
            "border border-emerald-200 bg-emerald-50 px-4 py-1.5",
            "text-xs font-semibold uppercase tracking-wider text-emerald-700"
          )}>
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Help Center
          </div>

          <h1
            id="faq-page-heading"
            className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl md:text-5xl lg:text-[3.5rem]"
          >
            Frequently{" "}
            <span className="text-emerald-600">Asked</span>{" "}
            Questions
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Everything you need to know about our writing services.
            Can&apos;t find an answer?{" "}
            <a
              href="mailto:info@tunedessays.com"
              className="font-medium text-emerald-600 underline-offset-2 hover:underline"
            >
              Reach out to us.
            </a>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border border-slate-200 bg-white px-4 py-2 shadow-sm",
              "text-sm font-medium text-slate-700"
            )}>
              <span className="text-emerald-500 font-bold">{FAQ_COUNT}</span>
              questions answered
            </div>
            <div className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border border-slate-200 bg-white px-4 py-2 shadow-sm",
              "text-sm font-medium text-slate-700"
            )}>
              <span className="text-emerald-500 font-bold">{CATEGORY_COUNT}</span>
              topic categories
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-b from-transparent to-[#f8f7f4]"
        aria-hidden="true"
      />
    </section>
  );
}
