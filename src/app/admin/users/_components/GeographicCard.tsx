import type { GeographicCardProps } from "../_props";

const FLAGS: Record<string, string> = {
  KE: "🇰🇪",
  GB: "🇬🇧",
  US: "🇺🇸",
  NG: "🇳🇬",
  CA: "🇨🇦",
  OT: "🌐",
};

const COLORS: Record<string, string> = {
  KE: "bg-emerald-500",
  GB: "bg-blue-500",
  US: "bg-purple-500",
  NG: "bg-amber-500",
  CA: "bg-pink-500",
  OT: "bg-slate-400",
};

export function GeographicCard({ items }: GeographicCardProps) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/40 p-5 backdrop-blur-md shadow-sm">
      <h2 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
        <span aria-hidden="true">🌐</span> Geographic Distribution
      </h2>
      <div className="mt-5 space-y-4">
        {items.map((item) => {
          const flag = FLAGS[item.country_code] || "🌐";
          const color = COLORS[item.country_code] || "bg-slate-500";
          return (
            <div key={item.country_code} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-2">
                  <span className="text-base" role="img" aria-label={item.country_name}>
                    {flag}
                  </span>
                  {item.country_name}
                </span>
                <span className="text-slate-800">{item.percentage}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100/80 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
