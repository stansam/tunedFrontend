"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Loader2, FileText, ArrowRight, XCircle } from "lucide-react";
import { useCallbackPage } from "../_hooks/useCallbackPage";
import { apiGet } from "@/api-client";
import type { ApiResult } from "@/lib/types";

interface PaymentItem {
  id: string;
  payment_id: string;
  order_id: string;
  status: string;
  amount: number;
}

interface CallbackClientPageProps {
  orderId: string;
  trackingId: string;
}

export function CallbackClientPage({ orderId, trackingId }: CallbackClientPageProps) {
  const { order, isLoading, isError, error } = useCallbackPage(orderId);
  const [paymentUuid, setPaymentUuid] = useState<string | null>(null);
  const fetchingRef = React.useRef(false);

  // Once the order is paid, retrieve the corresponding payment UUID for invoice/receipt downloads
  useEffect(() => {
    if (order && order.paid && !paymentUuid && !fetchingRef.current) {
      fetchingRef.current = true;
      apiGet<{ items: PaymentItem[] }>("/payments/list?per_page=50")
        .then((res: ApiResult<{ items: PaymentItem[] }>) => {
          if (res.ok && res.data?.items) {
            const matched = res.data.items.find(
              (p: PaymentItem) => String(p.order_id) === String(orderId)
            );
            if (matched) {
              setPaymentUuid(matched.id);
            }
          }
        })
        .catch((err) => {
          console.error("Failed to fetch payments list for invoice download:", err);
        })
        .finally(() => {
          fetchingRef.current = false;
        });
    }
  }, [order, orderId, paymentUuid]);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#e8e6e1]">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-2xl text-center space-y-6 animate-pulse">
          <div className="flex justify-center">
            <Loader2 className="h-14 w-14 text-emerald-600 animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-emerald-950">Verifying Payment</h2>
            <p className="text-sm text-emerald-800/80">
              Confirming transaction with Pesapal. This will only take a moment.
            </p>
          </div>
          <div className="pt-4 border-t border-emerald-900/10 text-xs text-emerald-800/60">
            Tracking ID: {trackingId}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#e8e6e1]">
        <div className="w-full max-w-md bg-white/75 backdrop-blur-md rounded-3xl p-8 border border-red-200/50 shadow-2xl text-center space-y-6">
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-rose-500 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-rose-950">Verification Failed</h2>
            <p className="text-sm text-rose-800/80">
              {error || "We encountered an issue confirming your payment status."}
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href="/client/dashboard"
              className="w-full h-11 flex items-center justify-center rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-lg shadow-rose-950/20 transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order.paid) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-[#e8e6e1]">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-2xl text-center space-y-6">
          <div className="flex justify-center">
            <AlertTriangle className="h-16 w-16 text-amber-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-amber-950">Payment Processing</h2>
            <p className="text-sm text-emerald-900/80">
              Your payment has been initiated but is still pending confirmation from Pesapal.
            </p>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-left text-xs text-amber-800 space-y-1">
            <span className="font-semibold block">Important:</span>
            Do not worry if your payment is not credited immediately. Pesapal takes up to a few minutes to notify our servers via the IPN webhook. Your order will be activated as soon as it clears.
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Link
              href={`/client/orders/${order.order_number}`}
              className="w-full h-11 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-950/20 transition-all duration-300"
            >
              View Order Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 sm:p-6 bg-[#e8e6e1]">
      <div className="w-full max-w-lg bg-white/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/50 shadow-2xl space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="rounded-full bg-emerald-50 p-3 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="h-14 w-14 text-emerald-600 animate-scale-in" />
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
              Payment Completed!
            </h2>
            <p className="text-sm text-emerald-800/80">
              Your payment was verified. The writing team has been assigned.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50/50 rounded-2xl p-4 sm:p-6 border border-emerald-500/10 space-y-4">
          <h3 className="text-xs font-semibold text-emerald-900/60 uppercase tracking-wider">
            Order Receipt Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center pb-2 border-b border-emerald-900/5">
              <span className="text-emerald-900/70">Order Number</span>
              <span className="font-bold text-emerald-950">{order.order_number}</span>
            </div>
            {order.service_type && (
              <div className="flex justify-between items-center pb-2 border-b border-emerald-900/5">
                <span className="text-emerald-900/70">Service Type</span>
                <span className="font-medium text-emerald-950">{order.service_type}</span>
              </div>
            )}
            {order.pages !== undefined && order.pages > 0 && (
              <div className="flex justify-between items-center pb-2 border-b border-emerald-900/5">
                <span className="text-emerald-900/70">Pages / Words</span>
                <span className="font-medium text-emerald-950">
                  {order.pages} page{order.pages > 1 ? "s" : ""} / {order.pages * 275} words
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold text-emerald-950">Total Paid</span>
              <span className="text-lg font-bold text-emerald-700">
                ${Number(order.total_price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paymentUuid ? (
            <>
              <a
                href={`${apiBaseUrl}/payments/${paymentUuid}/invoice`}
                target="_blank"
                rel="noreferrer"
                className="h-11 flex items-center justify-center rounded-xl bg-white border border-emerald-900/10 text-emerald-950 font-semibold shadow-sm hover:bg-emerald-50/50 transition-all duration-300 text-sm"
              >
                <FileText className="mr-2 h-4 w-4 text-emerald-700" /> Invoice PDF
              </a>
              <a
                href={`${apiBaseUrl}/payments/${paymentUuid}/receipt`}
                target="_blank"
                rel="noreferrer"
                className="h-11 flex items-center justify-center rounded-xl bg-white border border-emerald-900/10 text-emerald-950 font-semibold shadow-sm hover:bg-emerald-50/50 transition-all duration-300 text-sm"
              >
                <FileText className="mr-2 h-4 w-4 text-emerald-700" /> Receipt PDF
              </a>
            </>
          ) : (
            <div className="col-span-1 sm:col-span-2 text-center text-xs text-emerald-900/50">
              Retrieving document download links...
            </div>
          )}
        </div>

        <div className="pt-2">
          <Link
            href={`/client/orders/${order.order_number}`}
            className="w-full h-11 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:shadow-emerald-950/30 transition-all duration-300 text-sm"
          >
            Go to Your Order <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
