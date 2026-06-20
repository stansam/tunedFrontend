export interface CallbackPageProps {
  searchParams: Promise<{
    OrderTrackingId?: string;
    OrderMerchantReference?: string;
    OrderNotificationType?: string;
  }>;
}

export interface CallbackClientPageProps {
  orderId: string;
  trackingId: string;
}
