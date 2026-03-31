import { Phone, Mail, MapPin, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactRowProps } from "../../_props/footer.props";
import type { ContactIconName } from "../../_types/footer.types";

type IconComponent = React.ComponentType<LucideProps>;

const CONTACT_ICONS: Readonly<Record<ContactIconName, IconComponent>> = {
  phone:  Phone,
  mail:   Mail,
  mapPin: MapPin,
};

export function ContactRow({ items }: ContactRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = CONTACT_ICONS[item.icon];

        const inner = (
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                "bg-emerald-500/10 text-emerald-400"
              )}
              aria-hidden="true"
            >
              <Icon size={15} />
            </span>
            <span className="text-sm text-slate-400">{item.text}</span>
          </div>
        );

        if (item.href !== null) {
          return (
            <a
              key={item.text}
              href={item.href}
              className="group transition-opacity duration-150 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1117] rounded-md"
            >
              {inner}
            </a>
          );
        }

        return (
          <div key={item.text}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
