"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  getScrollTelemetry,
  subscribeScrollTelemetry,
} from "@/lib/scroll-telemetry";

export function ScrollTelemetryRail() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHome) return;

    const updateProgressBar = (progress: number) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
    };

    updateProgressBar(getScrollTelemetry().progress);

    const unsubFrame = subscribeScrollTelemetry((snapshot) => {
      updateProgressBar(snapshot.progress);
    });

    return () => {
      unsubFrame();
    };
  }, [isHome]);

  if (!isHome) return null;

  return (
    <div
      data-scroll-progress="true"
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-10 top-[80px] z-40 h-[2px] bg-white/[0.04] sm:inset-x-16 sm:top-[92px]"
    >
      <div
        ref={progressBarRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--ink-secondary)] to-[var(--status-ok)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
