import React from "react";

const BENEFITS = [
  "Expert Guidance",
  "Quality work done faster",
  "24/7 Support",
] as const;

function GreenCheck() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-0.5"
    >
      <path
        d="M4 10.5L8 14.5L16 6.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BenefitsList() {
  return (
    <ul className="space-y-3 mb-6" role="list">
      {BENEFITS.map((benefit) => (
        <li key={benefit} className="flex items-start gap-3">
          <GreenCheck />
          <span className="text-sm font-medium text-white/95 leading-snug">
            {benefit}
          </span>
        </li>
      ))}
    </ul>
  );
}
