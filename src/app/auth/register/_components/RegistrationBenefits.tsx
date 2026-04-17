import React from "react";
import { Percent, History, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    icon: Percent,
    title: "Exclusive Discounts",
    description: "Enjoy special offers and loyalty rewards",
  },
  {
    icon: History,
    title: "Order History",
    description: "Track and manage all your orders",
  },
  {
    icon: Bell,
    title: "Updates & Alerts",
    description: "Get notified about your order status",
  },
];

export function RegistrationBenefits() {
  return (
    <div className="w-full max-w-[420px] md:max-w-[880px] mt-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm relative z-20">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-emerald-600">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.42-1.41L17.83 13H22v-2z" /></svg>
        </span>
        <h3 className="font-bold text-slate-700">Benefits of Registration</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {BENEFITS.map((benefit, i) => (
          <div key={i} className={cn("flex flex-col items-center text-center", i > 0 && "pt-6 md:pt-0 pb-0")}>
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex flex-col items-center justify-center text-emerald-600 mb-3">
              <benefit.icon size={20} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{benefit.title}</h4>
            <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
