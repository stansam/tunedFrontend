import type {
  ContactItem,
  SocialLink,
  FooterLink,
} from "../_types/footer.types";

export interface FooterProps {
  readonly className?: string;
}

export interface FooterBrandProps {
  readonly tagline: string;
}

export interface ContactRowProps {
  readonly items: readonly ContactItem[];
}

export interface SocialLinksProps {
  readonly links: readonly SocialLink[];
}

export interface FooterLinksProps {
  readonly links: readonly FooterLink[];
  readonly year:  number;
}

export interface NewsletterFormProps {
  readonly heading?:    string;
  readonly subheading?: string;
  readonly className?:  string;
}
