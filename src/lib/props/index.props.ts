import type {
  Service,
  Level,
  FeaturedService,
  CategoryTab,
} from "@/types";
import type {
  QuoteFormState,
  CalculatePriceResponse,
} from "@/types/quote.type";

// ─── Navbar ───────────────────────────────────────────────────────────────────

export interface NavbarProps {
  /** Mark a nav item as active */
  activeRoute?: string;
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export interface HeroSectionProps {
  /** Pre-fetched services for the quote form */
  services: Service[];
  /** Pre-fetched levels for the quote form */
  levels: Level[];
  /** Pre-fetched featured services for the marquee */
  featuredServices: FeaturedService[];
}

// ─── Quote Form ───────────────────────────────────────────────────────────────

export interface QuoteFormProps {
  services: Service[];
  levels: Level[];
}

export interface QuoteFormTabsProps {
  activeTab: CategoryTab;
  onTabChange: (tab: CategoryTab) => void;
}

export interface ServiceSelectProps {
  services: Service[];
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

// ─── Marquee ─────────────────────────────────────────────────────────────────

export interface ServicesMarqueeProps {
  featuredServices: FeaturedService[];
}

export interface ServiceCardProps {
  service: FeaturedService;
}

// ─── Hero Blocks ─────────────────────────────────────────────────────────────

export interface HeroLeftBlockProps {
  /** Optional search placeholder override */
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export interface HeroPhoneBlockProps {
  services: Service[];
  levels: Level[];
}
