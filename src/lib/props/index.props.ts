import type {
  Service,
  Level,
  CategoryTab,
  QuoteFormState,
  QuoteFormOptions,
  CalculatePriceResponse,
} from "@/lib/types";
import { ServiceWithPricingCategory } from "../types/quote.type";
import type { ServiceCategory as MainServiceCategory } from "@/app/(main)/_types";


export interface NavbarProps {
  activeRoute?: string;
}


export interface HeroSectionProps {
  options: QuoteFormOptions;
  featuredServices: readonly MainServiceCategory[];
}

export interface QuoteFormProps {
  options: QuoteFormOptions;
}

export interface QuoteFormTabsProps {
  activeTab: CategoryTab;
  onTabChange: (tab: CategoryTab) => void;
}

export interface ServiceSelectProps {
  services: ServiceWithPricingCategory[];
  activeTab: CategoryTab;
  value: string | null;
  onChange: (serviceId: string) => void;
  disabled?: boolean;
}

export interface LevelSelectProps {
  levels: Level[];
  value: string | null;
  onChange: (levelId: string) => void;
  disabled?: boolean;
}

export interface DeadlinePickerProps {
  value: string | null; // ISO 8601 UTC
  onChange: (isoUtcString: string) => void;
  disabled?: boolean;
}

export interface PageCountControlProps {
  value: number;
  wordsPerPage: number;
  onChange: (count: number) => void;
  min?: number;
  max?: number;
}

export interface PriceDisplayProps {
  price: CalculatePriceResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface ContinueButtonProps {
  formState: QuoteFormState;
  disabled?: boolean;
  onClick?: () => void;
}

export interface HeroLeftBlockProps {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export interface HeroPhoneBlockProps {
  options: QuoteFormOptions;
}
