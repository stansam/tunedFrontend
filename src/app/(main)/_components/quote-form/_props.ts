import { ServiceWithPricingCategory } from "@/lib/types"

export interface OptionItemProps {
  service: ServiceWithPricingCategory;
  isSelected: boolean;
  isActive: boolean;
  optionId: string;
  onSelect: (id: string) => void;
  onMouseEnter: (index: number) => void;
  index: number;
}