"use client";

import {
  Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { KPICardProps } from "../_props/dashboard.props";

export function KPICard({
  title,
  value,
  description,
  badgeLabel,
  badgeClass,
  icon,
}: KPICardProps) {
  return (
    <Card className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xs transition-all duration-300 hover:bg-white/50 hover:shadow-sm">
      <CardHeader>
        <CardDescription className="text-slate-600 font-medium">{title}</CardDescription>
        <CardTitle className="text-2xl font-bold text-slate-800 tabular-nums">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline" className={`${badgeClass} border-none font-semibold px-2 py-0.5 rounded-full`}>
            <span className="flex items-center">
              {icon}
              {badgeLabel}
            </span>
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-xs text-slate-500 font-medium">
        {description}
      </CardFooter>
    </Card>
  );
}
