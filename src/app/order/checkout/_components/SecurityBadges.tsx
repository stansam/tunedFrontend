import { ShieldCheck, Lock } from "lucide-react";

export function SecurityBadges() {
  return (
    <div className="flex items-center justify-center gap-6 py-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
        Bank-grade Security
      </span>
      <span className="text-border">•</span>
      <span className="flex items-center gap-1.5">
        <Lock className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
        256-bit Encryption
      </span>
    </div>
  );
}

export function SslBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
      <Lock className="h-3 w-3" aria-hidden />
      SSL Encrypted
    </span>
  );
}
