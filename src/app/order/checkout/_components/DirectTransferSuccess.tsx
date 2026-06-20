import { CheckCircle2 } from "lucide-react";

interface DirectTransferSuccessProps {
  paymentId: string | null;
}

export function DirectTransferSuccess({ paymentId }: DirectTransferSuccessProps) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm text-center space-y-3">
      <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
      <h2 className="font-semibold text-foreground">Proof Submitted</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Your payment proof has been received and is pending admin verification.
        You will be notified once it is verified.
      </p>
      {paymentId && (
        <p className="text-xs text-muted-foreground font-mono bg-muted/60 rounded-lg px-3 py-1.5 inline-block">
          Ref: {paymentId}
        </p>
      )}
    </div>
  );
}
