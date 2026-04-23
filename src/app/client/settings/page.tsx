import { ComingSoon } from "../_components/ComingSoon";
import { Settings05Icon } from "@hugeicons/core-free-icons";

export const metadata = {
  title: "Settings | TunedEssays",
  description: "Configure your notifications, security, and account settings.",
};

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      description="Configure notifications, two-factor authentication, and all account security preferences."
      icon={Settings05Icon}
      eta="Q4 2025"
    />
  );
}
