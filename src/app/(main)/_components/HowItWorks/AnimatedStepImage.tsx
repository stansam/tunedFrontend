import { forwardRef, type CSSProperties } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { StepImageProps } from "../../_props/howItworks.props";

export const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 26,
      mass: 0.5,
    },
  },
} as const;

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style }, ref) => {
    return (
      <Image
        ref={ref}
        src={src ?? ""}
        alt={alt ?? ""}
        className={className}
        style={style}
        draggable={false}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }
);

StepImage.displayName = "StepImage";

const MotionStepImage = motion.create(StepImage);

interface AnimatedStepImageProps extends StepImageProps {
  delay?: number;
  isFirst?: boolean;
}

export function AnimatedStepImage({
  delay = 0,
  isFirst = false,
  style,
  ...props
}: AnimatedStepImageProps) {
  const preset = ANIMATION_PRESETS.fadeInScale;

  const combinedStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    userSelect: "none",
    ...style,
  };

  return (
    <MotionStepImage
      {...props}
      {...preset}
      transition={{ ...preset.transition, delay }}
      style={combinedStyle}
      loading={isFirst ? "eager" : "lazy"}
      fetchPriority={isFirst ? "high" : "auto"}
    />
  );
}
