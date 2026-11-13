import React from "react";
import { cn } from "@/lib/utils";

interface TegrityLogoMarkProps {
  className?: string;
  accentSlash?: boolean;
}

/**
 * Tegrity-Soft vector emblem: retro-modern monitor housing the `</>` code glyph.
 */
export function TegrityLogoMark({
  className,
  accentSlash = true,
}: TegrityLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 56"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect
        x="5"
        y="5"
        width="54"
        height="36"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="4.2"
      />
      <path
        d="M23 17.5L16.5 23L23 28.5"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.5 14L29.5 32"
        stroke={accentSlash ? "var(--accent)" : "currentColor"}
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <path
        d="M41 17.5L47.5 23L41 28.5"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 41V49.5M20.5 49.5H43.5"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface TegrityBrandLockupProps {
  className?: string;
  markClassName?: string;
  showSignalBars?: boolean;
  compact?: boolean;
}

/**
 * Full Tegrity-Soft brand lockup with optional retro broadcast SMPTE phosphor accent strip.
 */
export function TegrityBrandLockup({
  className,
  markClassName = "h-7 w-8",
  showSignalBars = true,
  compact = false,
}: TegrityBrandLockupProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex items-center justify-center text-[var(--ink-primary)] drop-shadow-[0_0_8px_rgba(56,189,248,0.22)]">
        <TegrityLogoMark className={markClassName} />
      </span>

      <span className="flex flex-col leading-none">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "font-display font-bold tracking-tight text-[var(--ink-primary)]",
              compact ? "text-base sm:text-lg" : "text-lg sm:text-xl"
            )}
          >
            Tegrity-Soft
          </span>
        </span>
        {showSignalBars && (
          <span
            aria-hidden="true"
            className="crt-bw-target mt-1 grid h-[3px] w-full max-w-[108px] grid-cols-5 gap-[2px] opacity-90"
          >
            <span className="rounded-[1px] bg-[#e2e8f0]" />
            <span className="rounded-[1px] bg-[#facc15]" />
            <span className="rounded-[1px] bg-[#38bdf8]" />
            <span className="rounded-[1px] bg-[#34d399]" />
            <span className="rounded-[1px] bg-[#fb7185]" />
          </span>
        )}
      </span>
    </span>
  );
}
