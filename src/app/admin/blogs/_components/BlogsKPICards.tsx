import type { BlogsKPICardsProps } from "../_props/blogs.props";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, Edit2, MessageSquare, AlertCircle } from "lucide-react";

export function BlogsKPICards({ stats, loading }: BlogsKPICardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 lg:px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="bg-white/40 border-white/50 shadow-xs h-24 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  const items = [
    { label: "Total Posts", value: stats?.total_posts ?? 0, icon: FileText, color: "text-blue-500" },
    { label: "Published", value: stats?.published_posts ?? 0, icon: CheckCircle, color: "text-emerald-500" },
    { label: "Drafts", value: stats?.draft_posts ?? 0, icon: Edit2, color: "text-amber-500" },
    { label: "Comments", value: stats?.total_comments ?? 0, icon: MessageSquare, color: "text-indigo-500" },
    { label: "Pending", value: stats?.pending_comments ?? 0, icon: AlertCircle, color: "text-rose-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-4 lg:px-6">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xs transition-all duration-300 hover:bg-white/50 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</span>
              <Icon className={`size-4 ${item.color}`} />
            </div>
            <span className="text-2xl font-bold text-slate-900 mt-2">{item.value}</span>
          </Card>
        );
      })}
    </div>
  );
}
