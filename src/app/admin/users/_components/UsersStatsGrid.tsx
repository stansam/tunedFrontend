import { Users, RefreshCw, UserMinus, Gem } from "lucide-react";
import type { UsersStatsGridProps } from "../_props";

export function UsersStatsGrid({ stats }: UsersStatsGridProps) {
  const cards = [
    {
      title: "Total Clients",
      value: stats.total_clients,
      sub: `+${stats.total_clients_growth_this_month} this month`,
      subColor: "text-emerald-600",
      icon: Users,
      iconBg: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Returning Clients",
      value: `${stats.returning_clients_percentage}%`,
      sub: `↑ ${stats.returning_clients_growth_vs_last_month}% vs last month`,
      subColor: "text-emerald-600",
      icon: RefreshCw,
      iconBg: "bg-teal-500/10 text-teal-600",
    },
    {
      title: "Dormant Clients",
      value: stats.dormant_clients_count,
      sub: "No order in 30d",
      subColor: "text-slate-500",
      icon: UserMinus,
      iconBg: "bg-amber-500/10 text-amber-600",
    },
    {
      title: "High-Value Clients",
      value: stats.high_value_clients_count,
      sub: "CLV > $500",
      subColor: "text-purple-600",
      icon: Gem,
      iconBg: "bg-purple-500/10 text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/40 p-5 backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-black text-slate-900 md:text-3xl">
                {card.value}
              </span>
              <p className={`mt-1 text-xs font-semibold ${card.subColor}`}>
                {card.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
