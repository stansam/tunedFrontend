import { motion } from "framer-motion";
import { FeaturedServiceCard } from "./FeaturedService";
import { FALLBACK_ICON } from "@/lib/utils/resolveServiceIcon";
import type { FeaturedServicesDesktopGridProps } from "../_props/featured.props";

export function FeaturedServicesDesktopGrid({
  services,
  iconRecord,
}: FeaturedServicesDesktopGridProps) {
  return (
    <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <FeaturedServiceCard
              key={service.id}
              service={service}
              icon={iconRecord[service.id] ?? FALLBACK_ICON}
              className="w-full max-w-none shrink sm:w-full"
            />
          ))}
        </motion.div>
    </div>
  );
}
