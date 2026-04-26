import { ComingSoon } from "../_components/ComingSoon";
import { GiftIcon } from "@hugeicons/core-free-icons";

export const metadata = {
  title: "Referrals | TunedEssays",
  description: "Refer friends and earn rewards!",
};

export default function ReferralPage() {
  return (
    <ComingSoon
      title="Referrals"
      description="Refer friends and earn rewards!"
      icon={GiftIcon}
      eta="Q3 2025"
    />
  );
}
