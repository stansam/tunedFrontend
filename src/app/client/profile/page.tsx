import { ComingSoon } from "../_components/ComingSoon";
import { UserIcon } from "@hugeicons/core-free-icons";

export const metadata = {
  title: "Profile | TunedEssays",
  description: "Manage your personal profile and account details.",
};

export default function ProfilePage() {
  return (
    <ComingSoon
      title="Profile"
      description="Update your personal information, manage your preferences, and control your account privacy."
      icon={UserIcon}
      eta="Q3 2025"
    />
  );
}
