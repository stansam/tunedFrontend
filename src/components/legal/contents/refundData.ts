import { CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from "lucide-react";

export interface RefundCardItem {
  readonly bold: string;
  readonly desc: string;
}

export interface RefundCard {
  readonly title: string;
  readonly icon: LucideIcon;
  readonly bg: string;
  readonly iconBg: string;
  readonly badgeBg: string;
  readonly rate: string;
  readonly symbol: string;
  readonly symbolColor: string;
  readonly items: readonly RefundCardItem[];
}

export const CARDS: readonly RefundCard[] = [
  {
    title: "Eligible for Refund",
    icon: CheckCircle2,
    bg: "border-emerald-100 bg-emerald-50/20",
    iconBg: "bg-emerald-100 text-emerald-600",
    badgeBg: "bg-emerald-100/40 text-emerald-800",
    rate: "Refund Rate: 100%",
    symbol: "✓",
    symbolColor: "text-emerald-500",
    items: [
      { bold: "Duplicate Payment", desc: "If you accidentally pay twice, the duplicate amount is 100% refunded immediately." },
      { bold: "Service Not Delivered", desc: "If we fail to deliver or match deadlines without extensions, you receive a full refund." }
    ]
  },
  {
    title: "Partial Refund",
    icon: AlertTriangle,
    bg: "border-amber-100 bg-amber-50/20",
    iconBg: "bg-amber-100 text-amber-600",
    badgeBg: "bg-amber-100/40 text-amber-800",
    rate: "Prorated / Progress-Based",
    symbol: "⚠",
    symbolColor: "text-amber-500",
    items: [
      { bold: "Work Already Completed", desc: "If you cancel after writing/editing has started, refund is prorated based on completed progress." },
      { bold: "Editor Assigned", desc: "A small transaction fee may be deducted if an editor is already allocated." }
    ]
  },
  {
    title: "Not Eligible",
    icon: XCircle,
    bg: "border-red-100 bg-red-50/20",
    iconBg: "bg-red-100 text-red-600",
    badgeBg: "bg-red-100/40 text-red-800",
    rate: "No Refund Available",
    symbol: "✕",
    symbolColor: "text-red-500",
    items: [
      { bold: "Approved Delivery", desc: "Once you review and explicitly approve the delivered document, it is not eligible for a refund." },
      { bold: "Exhausted Revisions", desc: "Refunds cannot be issued after you request and receive multiple complete revision cycles." }
    ]
  }
];
