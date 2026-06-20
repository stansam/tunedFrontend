import React from "react";
import { notFound } from "next/navigation";
import { CallbackClientPage } from "./_components/CallbackClientPage";
import type { CallbackPageProps } from "./_props/callback.props";

export const dynamic = "force-dynamic";

export default async function CheckoutCallbackRoute({ searchParams }: CallbackPageProps) {
  const params = await searchParams;
  const orderId = params.OrderMerchantReference?.trim();
  const trackingId = params.OrderTrackingId?.trim();

  // If parameters are missing, render notFound or show standard error
  if (!orderId || !trackingId) {
    notFound();
  }

  return (
    <CallbackClientPage 
      orderId={orderId} 
      trackingId={trackingId} 
    />
  );
}
