import type { PaymentMethod, ActiveTab } from "../_types/checkout.types";

export function getInstantMethod(
  methods: PaymentMethod[]
): PaymentMethod | null {
  return methods.find((m) => m.category === "credit_card" && m.is_active) ?? null;
}

export function getDirectTransferMethod(
  methods: PaymentMethod[]
): PaymentMethod | null {
  return (
    methods.find(
      (m) =>
        (m.category === "bank_transfer" || m.category === "digital_wallet") &&
        m.is_active
    ) ?? null
  );
}

export function resolveActiveTab(
  tab: ActiveTab,
  instantMethod: PaymentMethod | null,
  directMethod: PaymentMethod | null
): ActiveTab {
  if (tab === "instant" && !instantMethod) return "direct";
  if (tab === "direct" && !directMethod) return "instant";
  return tab;
}

export function getMethodIdForTab(
  tab: ActiveTab,
  instantMethod: PaymentMethod | null,
  directMethod: PaymentMethod | null
): string | null {
  if (tab === "instant") return instantMethod?.id ?? null;
  return directMethod?.id ?? null;
}
