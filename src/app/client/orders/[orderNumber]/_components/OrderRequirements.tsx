"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Paperclip } from "lucide-react";
import { formatDateTime } from "../_utils";
import type { OrderRequirementsProps } from "../_props";

const AFFIRMATION =
  "I affirm that the information I've provided is accurate and complete. " +
  "Any changes to the requirements I submitted at this stage may incur additional costs.";

export function OrderRequirements({ order }: OrderRequirementsProps) {
  const [open, setOpen] = useState(true);
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <button onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        aria-expanded={open} aria-controls="req-body">
        <h3 className="font-semibold text-slate-800">Requirements</h3>
        <Chevron className="h-5 w-5 shrink-0 text-slate-400" />
      </button>

      {open && (
        <div id="req-body" className="divide-y divide-slate-100 border-t border-slate-100">
          <div className="px-5 py-3 text-sm">
            <span className="font-semibold text-slate-800">Topic: </span>
            <span className="text-slate-600">{order.title}</span>
          </div>

          <div className="px-5 py-4">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h4 className="font-semibold text-slate-800">Description</h4>
              {order.created_at && (
                <span className="shrink-0 text-xs text-slate-400">
                  {formatDateTime(order.created_at)}
                </span>
              )}
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {order.instructions}
            </p>
          </div>

          {!!order.attachments?.length && (
            <div className="px-5 py-3">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Attachments
              </p>
              <ul className="flex flex-col gap-1.5">
                {order.attachments.map((att) => (
                  <li key={att.id}>
                    <a href={att.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-emerald-600 hover:underline">
                      <Paperclip className="h-3.5 w-3.5 shrink-0" />
                      {att.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Affirmation */}
          <div className="px-5 py-4">
            <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3">
              <span className="mt-0.5 text-xs font-bold text-emerald-500">✓</span>
              <p className="text-xs leading-relaxed text-slate-500">{AFFIRMATION}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
