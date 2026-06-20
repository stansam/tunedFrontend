"use client";

import { useState } from "react";
import { usePaymentFilters } from "../_hooks/usePaymentFilters";
import { usePayments } from "../_hooks/usePayments";
import { usePaymentActions } from "../_hooks/usePaymentActions";
import { PaymentsToolbar } from "./PaymentsToolbar";
import { PaymentCard } from "./PaymentCard";
import { RejectPaymentModal } from "./RejectPaymentModal";
import { PaymentsSkeleton } from "./PaymentsSkeleton";
import { Button } from "@/components/ui/button";

export function PaymentsPageClient() {
  const { filters, setStatus, setSearch, setPage } = usePaymentFilters();
  const { data, isLoading } = usePayments(filters);
  const { verifyPayment, isVerifying, rejectPayment, isRejecting } = usePaymentActions();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [rejectId, setRejectId] = useState<string | null>(null);

  if (isLoading || !data) return <PaymentsSkeleton />;

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Financial Ledger</h2>
        <p className="text-xs text-slate-500">Track and verify payments across the platform</p>
      </div>

      <PaymentsToolbar
        searchValue={filters.q}
        onSearchChange={setSearch}
        statusValue={filters.status}
        onStatusChange={setStatus}
      />

      <div className="space-y-4">
        {data.payments.length === 0 ? (
          <div className="text-center p-12 text-slate-500 text-xs font-semibold rounded-2xl border border-dashed border-slate-300 bg-white/20">
            No payments found matching the selected filters.
          </div>
        ) : (
          data.payments.map((p) => (
            <PaymentCard
              key={p.id}
              payment={p}
              isExpanded={expandedId === p.id}
              onToggleExpand={() => setExpandedId(expandedId === p.id ? null : p.id)}
              onVerify={() => verifyPayment(p.id)}
              onReject={() => setRejectId(p.id)}
              isActionPending={isVerifying || isRejecting}
            />
          ))
        )}
      </div>

      {data.total > 10 && (
        <div className="flex justify-between items-center bg-white/20 border border-white/50 px-4 py-3 rounded-2xl mt-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Showing Page {data.page} of {Math.ceil(data.total / 10)}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={filters.page === 1} onClick={() => setPage(filters.page - 1)} className="h-8 rounded-xl text-xs">
              Prev
            </Button>
            <Button size="sm" variant="outline" disabled={filters.page >= Math.ceil(data.total / 10)} onClick={() => setPage(filters.page + 1)} className="h-8 rounded-xl text-xs">
              Next
            </Button>
          </div>
        </div>
      )}

      <RejectPaymentModal
        isOpen={rejectId !== null}
        onClose={() => setRejectId(null)}
        onConfirm={async (reason) => {
          if (rejectId) {
            await rejectPayment({ paymentId: rejectId, reason });
            setRejectId(null);
          }
        }}
        isSubmitting={isRejecting}
      />
    </div>
  );
}
