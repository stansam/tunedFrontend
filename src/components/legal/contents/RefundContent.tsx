"use client";

import { ShieldCheck } from "lucide-react";
import { CARDS } from "./refundData";

export function RefundContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-slate-700 leading-relaxed text-xs">
          <p className="font-semibold text-slate-900">Our Chargeback & Dispute Prevention Guarantee</p>
          <p className="mt-1">We value your trust. To prevent payment disputes, we enforce clear refund policies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CARDS.map((card, i) => (
          <div key={i} className={`rounded-2xl border ${card.bg} p-5 space-y-4 flex flex-col`}>
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg}`}>
                <card.icon size={18} />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{card.title}</h4>
            </div>
            <ul className="text-slate-700 space-y-2 text-xs flex-1">
              {card.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`${card.symbolColor} font-bold`}>{card.symbol}</span>
                  <span><strong>{item.bold}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
            <div className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold text-center ${card.badgeBg}`}>
              {card.rate}
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-slate-500 leading-relaxed text-center mt-4">
        Refund processes take 5 to 10 business days to reflect on your statement.
        <br />
        Request a refund review by contacting: <span className="font-semibold text-emerald-600">billing@tunedessays.com</span>
      </div>
    </div>
  );
}
