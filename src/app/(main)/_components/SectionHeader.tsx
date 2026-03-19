import { cn } from "@/lib/utils";
import type { SectionHeaderProps } from "../_props";

export function SectionHeader({
  id,
  title,
  description,
  backgroundLabel,
  backgroundPosition = "left",
  align = "center",
  accentWord,
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!accentWord) {
      return <span>{title}</span>;
    }
    const parts = title.split(new RegExp(`(${accentWord})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-emerald-600">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className={cn("relative mb-10", align === "center" ? "text-center" : "text-left")}>
      {backgroundLabel && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-8 -z-10 select-none",
            "text-[120px] font-extrabold leading-none text-slate-800 opacity-[0.03]",
            "md:text-[200px] lg:text-[280px]",
            backgroundPosition === "left" ? "-left-[8%]" : "-right-[8%]"
          )}
        >
          {backgroundLabel}
        </span>
      )}

      <h2
        id={id}
        className={cn(
          "text-3xl font-bold text-slate-800 leading-tight",
          "md:text-4xl lg:text-5xl",
          "mb-3"
        )}
      >
        {renderTitle()}
      </h2>

      <p
        className={cn(
          "text-slate-500 text-base leading-relaxed",
          "md:text-lg",
          align === "center" && "mx-auto max-w-2xl"
        )}
      >
        {description}
      </p>
    </div>
  );
}
