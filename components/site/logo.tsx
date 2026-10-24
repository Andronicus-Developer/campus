export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const wordColor = tone === "light" ? "#ffffff" : "#0f172a";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Icon mark: rounded square with a graduation-cap-inspired shape */}
      <svg viewBox="0 0 36 36" className="size-8 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f6ef7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="10" fill="url(#logo-grad)" />
        {/* Cap brim */}
        <path
          d="M8 17l10-5 10 5-10 5z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Cap top highlight */}
        <path
          d="M18 12l10 5v1l-10-5z"
          fill="white"
          fillOpacity="0.45"
        />
        {/* Tassel / stem */}
        <line x1="28" y1="17" x2="28" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
        <circle cx="28" cy="24" r="1.5" fill="white" fillOpacity="0.8" />
      </svg>

      <span
        className="text-[1.25rem] font-bold tracking-tight"
        style={{ color: wordColor }}
      >
        Campus<span className="text-gradient">360</span>
      </span>
    </span>
  );
}
