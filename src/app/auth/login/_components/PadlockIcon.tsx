import React from "react";

export function PadlockIcon() {
  return (
    <div
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center"
      aria-hidden="true"
    >
      <svg
        width="56"
        height="60"
        viewBox="0 0 56 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="6" y="26" width="44" height="30" rx="5" fill="#16a34a" />
        <path
          d="M16 26V18C16 10.268 22.268 4 30 4C37.732 4 44 10.268 44 18V26"
          stroke="#16a34a"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M44 18V22"
          stroke="#16a34a"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="28" cy="41" r="5" fill="white" opacity="0.9" />
        <rect x="26" y="42" width="4" height="7" rx="2" fill="white" opacity="0.9" />
        <rect x="6" y="26" width="44" height="8" rx="5" fill="#22c55e" opacity="0.3" />
        <text
          x="28"
          y="36"
          textAnchor="middle"
          fontSize="7"
          fontWeight="bold"
          fill="white"
          opacity="0.7"
        >
          Tuned
        </text>
      </svg>
    </div>
  );
}
