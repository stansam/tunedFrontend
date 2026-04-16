export function VerifyingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4 text-center" aria-busy="true">
      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-emerald-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
      <p className="text-slate-600 font-medium">Verifying your email…</p>
    </div>
  );
}
