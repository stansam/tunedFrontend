export type ContactIconName = "phone" | "mail" | "mapPin";
export type SocialIconName  = "facebook" | "twitter" | "instagram";

export interface ContactItem {
  readonly icon: ContactIconName;
  readonly text: string;
  readonly href: string | null;
}

export interface SocialLink {
  readonly icon:  SocialIconName;
  readonly label: string;
  readonly href:  string;
}

export interface FooterLink {
  readonly label: string;
  readonly href:  string;
}

export interface FooterData {
  readonly contactItems: readonly ContactItem[];
  readonly socialLinks:  readonly SocialLink[];
  readonly legalLinks:   readonly FooterLink[];
}

export type NewsletterFormStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error";   message: string };
