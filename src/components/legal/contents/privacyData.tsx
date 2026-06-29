import { Database, Fingerprint, FolderUp, Cookie, Lock, Sparkles, Hourglass, LucideIcon } from "lucide-react";

export interface PrivacySection {
  readonly id: string;
  readonly title: string;
  readonly icon: LucideIcon;
  readonly keywords: readonly string[];
  readonly content: React.ReactNode;
}

export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    id: "what-we-collect",
    title: "What We Collect",
    icon: Database,
    keywords: ["name", "email", "phone", "metadata", "profile", "gender", "collect", "personal information"],
    content: (
      <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
        <p>
          We collect personal information necessary to deliver quality services. This includes:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Identity details:</strong> Name, username, gender, and contact phone number.</li>
          <li><strong>Credentials:</strong> Password hash for login authentication.</li>
          <li><strong>Contact details:</strong> Verified email address to receive delivery updates and notifications.</li>
          <li><strong>Transaction information:</strong> Payment transaction metadata (we do NOT store complete credit card info).</li>
        </ul>
      </div>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How We Use It",
    icon: Fingerprint,
    keywords: ["use", "purpose", "processing", "orders", "support", "communications", "newsletter"],
    content: (
      <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
        <p>
          Your information is processed for specific, legitimate business purposes:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>To set up, maintain, and verify your account.</li>
          <li>To process, proofread, and deliver your document orders.</li>
          <li>To communicate transaction receipts, order updates, and customer support queries.</li>
          <li>To send writing tips and promotional guides (which you can opt-out of at any time).</li>
        </ul>
      </div>
    ),
  },
  {
    id: "file-uploads",
    title: "File Uploads & Documents",
    icon: FolderUp,
    keywords: ["file", "uploads", "essays", "documents", "storage", "confidentiality", "encryption"],
    content: (
      <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
        <p>
          When you upload documents for proofreading or editing:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Files are transmitted securely via TLS encryption to private cloud storage buckets.</li>
          <li>Only assigned professional editors and platform admins have access to view or edit these documents.</li>
          <li>Your documents are strictly confidential and are never published, shared, sold, or indexable by search engines.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: Cookie,
    keywords: ["cookies", "tracking", "session", "localstorage", "analytics", "persistence", "token"],
    content: (
      <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
        <p>
          We use cookies and local storage tokens to optimize your platform experience:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Authentication cookies:</strong> To maintain secure logins and session persistence.</li>
          <li><strong>Functional store:</strong> To remember configurations, preference themes, and policy acceptances.</li>
          <li><strong>Analytics:</strong> To gather anonymous telemetry data regarding page speeds and navigation paths.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "security",
    title: "Data Security Standards",
    icon: Lock,
    keywords: ["security", "ssl", "tls", "encryption", "pci", "hashing", "bcrypt", "argon2"],
    content: (
      <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
        <p>
          Protecting your data is our highest priority. We use:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Strong industry-standard cryptographic algorithms (like bcrypt or Argon2) to hash passwords.</li>
          <li>HTTPS with TLS 1.3 protocol encryption for all web requests.</li>
          <li>Secure session protection with HttpOnly, Secure, and SameSite cookie policies.</li>
          <li>PCI-DSS compliant payment gateways to process financial transactions securely.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights & GDPR / CCPA Compliance",
    icon: Sparkles,
    keywords: ["rights", "gdpr", "ccpa", "access", "delete", "export", "rectification", "opt-out"],
    content: (
      <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
        <p>
          Depending on your location, you hold legal rights regarding your data:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Access & Portability:</strong> You can request a copy of all personal data we store.</li>
          <li><strong>Rectification:</strong> You can modify your profile details directly from the dashboard settings.</li>
          <li><strong>Deletion (&quot;Right to be Forgotten&quot;):</strong> {""}You can request the complete deletion of your account and files.</li>
          <li><strong>Consent withdrawal:</strong> You can opt-out of newsletter lists or revoke tracking consents.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: Hourglass,
    keywords: ["retention", "duration", "how long", "archives", "deleting", "orders"],
    content: (
      <div className="space-y-3 text-slate-700 leading-relaxed text-sm">
        <p>
          We retain account data for as long as your account is active or needed to resolve payment invoicing or audit trails.
        </p>
        <p>
          Completed order documents are stored for 180 days to support revisions and file recovery, after which they may be
          permanently archived or purged from our active filesystems.
        </p>
      </div>
    ),
  },
];
