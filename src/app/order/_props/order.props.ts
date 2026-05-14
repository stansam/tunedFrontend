import React from "react";

import type { 
  OrderFormState, OrderPriceState, OrderOptions, 
  OrderFormStep1, OrderFormStep2, OrderFormStep3 
} from "../_types/order.types";
import type { ServiceWithPricingCategory, Level } from "@/lib/types";

export interface OrderWizardProps {
  readonly initialParams: Partial<OrderFormStep1>;
}

export interface StepProps {
  readonly state: OrderFormState;
  readonly priceState: OrderPriceState;
  readonly setPriceState: React.Dispatch<React.SetStateAction<OrderPriceState>>;
  readonly options: OrderOptions;
  readonly updateStep1: (data: Partial<OrderFormStep1>) => void;
  readonly updateStep2: (data: Partial<OrderFormStep2>) => void;
  readonly updateStep3: (data: Partial<OrderFormStep3>) => void;
  readonly nextStep: () => void;
  readonly prevStep: () => void;
  readonly goToStep: (step: 1 | 2 | 3) => void;
}

export interface ServiceSelectProps {
  readonly services: ServiceWithPricingCategory[];
  readonly value: string | null;
  readonly onChange: (id: string) => void;
  readonly isLoading?: boolean;
}

export interface LevelSelectProps {
  readonly levels: Level[];
  readonly value: string | null;
  readonly onChange: (id: string) => void;
}

export interface ReportTypeProps {
  readonly value: "turnitin" | "standard" | null;
  readonly onChange: (type: "turnitin" | "standard" | null) => void;
}

export interface StepperProps {
  readonly currentStep: 1 | 2 | 3;
  readonly onStepClick: (step: 1 | 2 | 3) => void;
  readonly onSaveDraft: () => void;
  readonly isSavingDraft?: boolean;
}

export interface SubtotalBarProps {
  readonly subtotal: number;
  readonly isLoading: boolean;
  readonly onNext: () => void;
  readonly onBack: () => void;
  readonly showBack: boolean;
  readonly nextLabel?: string;
}
