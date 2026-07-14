"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchClientOrders } from "../../orders/_services/orders.service";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { OrderResponseDTO } from "../../orders/_types";

interface ChatCreateModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onCreate: (subject: string, orderId?: string) => Promise<void>;
  readonly isPending: boolean;
}

export function ChatCreateModal({ isOpen, onClose, onCreate, isPending }: ChatCreateModalProps) {
  const [subject, setSubject] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const { data: orders = [] } = useQuery<OrderResponseDTO[]>({
    queryKey: ["client-orders-link"],
    queryFn: async () => {
      const res = await fetchClientOrders({ status: null, q: null, sort: "created_at", order: "desc", page: 1, per_page: 20 });
      return res.ok ? res.data?.orders || [] : [];
    },
    enabled: isOpen,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    await onCreate(subject.trim(), selectedOrderId || undefined);
    setSubject("");
    setSelectedOrderId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 id="modal-title" className="text-xs font-bold text-slate-800">Start Support Chat</h3>
          <button type="button" onClick={onClose} aria-label="Close modal" className="rounded-lg p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-600"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-1">
            <label htmlFor="subject" className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Subject / Title</label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What can we help you with?" required className="text-xs h-9" />
          </div>
          <div className="space-y-1">
            <label htmlFor="order" className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Linked Order (Optional)</label>
            <select id="order" value={selectedOrderId} onChange={(e) => setSelectedOrderId(e.target.value)} className="w-full text-xs h-9 rounded-lg border border-slate-200 bg-white px-2 focus:ring-1 focus:ring-slate-800 focus:outline-none">
              <option value="">-- No Linked Order --</option>
              {orders.map((o: OrderResponseDTO) => (
                <option key={o.id} value={o.id}>Order #{o.order_number} ({o.title || "No Title"})</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-xs h-9">Cancel</Button>
            <Button type="submit" disabled={isPending || !subject.trim()} className="text-xs h-9 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4">{isPending ? "Creating..." : "Start Chat"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ChatCreateModal;
