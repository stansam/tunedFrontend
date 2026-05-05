"use client";

import { ShieldCheck, Headphones, Award } from "lucide-react";

const TRUST_BADGES = [
  { icon: ShieldCheck, title: "256-bit AES", desc: "Encrypted Transactions" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
  { icon: Award, title: "Quality Guarantee", desc: "Zero plagiarism policy" },
];

export function OrderFooter() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-white/50 py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <badge.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{badge.title}</h4>
                <p className="text-xs text-slate-500">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 TunedEssays writing services. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
