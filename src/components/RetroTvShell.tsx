"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getCrtPreferencesServerSnapshot,
  getCrtPreferencesSnapshot,
  subscribeCrtPreferences,
  toggleCrtBw,
  toggleCrtFx,
} from "@/lib/crt-preferences";
import {
  getScrollTelemetry,
  SECTION_CHAPTERS,
  subscribeActiveSection,
  type SectionId,
} from "@/lib/scroll-telemetry";

/**
 * Bowed CRT television tube opening for landscape viewports (1600x1000 coordinate space).
 * All 4 sides bow outward into organic pillowed corners rather than a flat rectangle.
 */
const CRT_DESKTOP_HOLE =
  "M 84 36 Q 800 4 1516 36 C 1554 38 1574 62 1578 112 Q 1596 500 1578 888 C 1574 938 1554 962 1516 964 Q 800 996 84 964 C 46 962 26 938 22 888 Q 4 500 22 112 C 26 62 46 38 84 36 Z";

/**
 * Bowed CRT television tube opening tuned for portrait mobile screens (400x840 coordinate space).
 */
const CRT_MOBILE_HOLE =
  "M 38 14 Q 200 2 362 14 C 384 16 391 28 392 56 Q 399 420 392 784 C 391 812 384 824 362 826 Q 200 838 38 826 C 16 824 9 812 8 784 Q 1 420 8 56 C 9 28 16 16 38 14 Z";

function getActiveSectionSnapshot(): SectionId {
  return getScrollTelemetry().activeSection;
}

function getActiveSectionServerSnapshot(): SectionId {
  return "inicio";
}

function formatClock(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function RetroTvShell() {
  const prefs = useSyncExternalStore(
    subscribeCrtPreferences,
    getCrtPreferencesSnapshot,
    getCrtPreferencesServerSnapshot
  );

  const activeSection = useSyncExternalStore(
    subscribeActiveSection,
    getActiveSectionSnapshot,
    getActiveSectionServerSnapshot
  );

  const [clockText, setClockText] = useState<string>("--:--");

  useEffect(() => {
    const updateClock = () => {
      setClockText(formatClock());
    };
    updateClock();
    const timer = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(timer);
  }, []);

  const activeChapter =
    SECTION_CHAPTERS.find((c) => c.id === activeSection) ?? SECTION_CHAPTERS[0];

  return (
    <>
      {/* CRT Screen Surface Texture (Scanlines + Phosphor Grille + Radial Tube Falloff) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[44] overflow-hidden"
      >
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 56%, rgba(0,0,0,0.52) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.06) 56%, rgba(0,0,0,0.52) 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 10%, black 19%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, transparent 10%, black 19%, black 100%)",
          }}
        />
        {prefs.crtFx && (
          <>
            <div className="crt-scanlines absolute inset-0" />
            <div className="crt-phosphor-grain absolute inset-0" />
          </>
        )}
      </div>

      {/* True Bowed Barrel-Curved CRT TV Bezel & Tube Shadow — Desktop/Tablet */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
        className="pointer-events-none fixed inset-0 z-[45] hidden h-full w-full sm:block"
      >
        <defs>
          <clipPath id="crtTubeClipDesktop">
            <path d={CRT_DESKTOP_HOLE} />
          </clipPath>
          <linearGradient id="crtDesktopTopClearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="black" />
            <stop offset="10%" stopColor="black" />
            <stop offset="19%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <mask id="crtDesktopShadowMask">
            <rect
              x="0"
              y="0"
              width="1600"
              height="1000"
              fill="url(#crtDesktopTopClearGrad)"
            />
          </mask>
          <linearGradient id="crtRimLightDesktop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="82%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.13)" />
          </linearGradient>
          <radialGradient id="crtTopDomeDesktop" cx="50%" cy="0%" r="75%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="65%" stopColor="rgba(255,255,255,0.015)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="crtGlareDesktop" x1="0%" y1="0%" x2="100%" y2="25%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.022)" />
            <stop offset="52%" stopColor="rgba(255,255,255,0.045)" />
            <stop offset="68%" stopColor="rgba(255,255,255,0.014)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Inner Tube Shadow (top masked on PC so header remains clear) & Convex Glass Glare */}
        <g clipPath="url(#crtTubeClipDesktop)">
          <g mask="url(#crtDesktopShadowMask)">
            <path
              d={CRT_DESKTOP_HOLE}
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth="128"
            />
            <path
              d={CRT_DESKTOP_HOLE}
              fill="none"
              stroke="rgba(0,0,0,0.48)"
              strokeWidth="66"
            />
            <path
              d={CRT_DESKTOP_HOLE}
              fill="none"
              stroke="rgba(0,0,0,0.88)"
              strokeWidth="26"
            />
          </g>
          {prefs.crtFx && (
            <>
              <ellipse cx="800" cy="24" rx="680" ry="62" fill="url(#crtTopDomeDesktop)" />
              <polygon
                points="480,0 1120,0 1480,1000 840,1000"
                fill="url(#crtGlareDesktop)"
              />
            </>
          )}
        </g>

        {/* Solid Outer Matte TV Casing Mask */}
        <path
          d={`M 0 0 H 1600 V 1000 H 0 Z ${CRT_DESKTOP_HOLE}`}
          fill="#020203"
          fillRule="evenodd"
        />

        {/* Sculpted Recessed Bezel Lip & Studio Highlight */}
        <path
          d={CRT_DESKTOP_HOLE}
          fill="none"
          stroke="#101218"
          strokeWidth="9"
        />
        <path
          d={CRT_DESKTOP_HOLE}
          fill="none"
          stroke="url(#crtRimLightDesktop)"
          strokeWidth="2.5"
        />
      </svg>

      {/* True Bowed Barrel-Curved CRT TV Bezel — Portrait Mobile */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 840"
        preserveAspectRatio="none"
        className="pointer-events-none fixed inset-0 z-[45] block h-full w-full sm:hidden"
      >
        <defs>
          <clipPath id="crtTubeClipMobile">
            <path d={CRT_MOBILE_HOLE} />
          </clipPath>
          <linearGradient id="crtRimLightMobile" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>
        </defs>
        <g clipPath="url(#crtTubeClipMobile)">
          <path
            d={CRT_MOBILE_HOLE}
            fill="none"
            stroke="rgba(0,0,0,0.38)"
            strokeWidth="34"
          />
          <path
            d={CRT_MOBILE_HOLE}
            fill="none"
            stroke="rgba(0,0,0,0.86)"
            strokeWidth="14"
          />
        </g>
        <path
          d={`M 0 0 H 400 V 840 H 0 Z ${CRT_MOBILE_HOLE}`}
          fill="#020203"
          fillRule="evenodd"
        />
        <path
          d={CRT_MOBILE_HOLE}
          fill="none"
          stroke="#101218"
          strokeWidth="4"
        />
        <path
          d={CRT_MOBILE_HOLE}
          fill="none"
          stroke="url(#crtRimLightMobile)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Bottom Retro TV Corner OSD Bar (Desktop / Tablet) */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-[26px] z-[46] hidden items-end justify-between px-10 md:flex lg:bottom-[30px] lg:px-14"
        aria-label="Telemetría de pantalla retro"
      >
        <div className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/[0.11] bg-[#08090d]/92 px-2.5 py-1 shadow-[0_6px_20px_rgba(0,0,0,0.65)]">
          <span className="px-1.5 font-mono-tech text-[11px] tracking-[0.12em] text-[var(--ink-secondary)] tabular-nums">
            {clockText} LOC
          </span>
          <span className="text-white/20" aria-hidden="true">
            |
          </span>
          <button
            type="button"
            onClick={toggleCrtBw}
            aria-pressed={prefs.bw}
            className={`interactive-control rounded-full px-2.5 py-1 font-mono-tech text-[11px] tracking-[0.12em] uppercase ${
              prefs.bw
                ? "bg-[var(--ink-primary)] font-semibold text-[#060709]"
                : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
            }`}
          >
            B&amp;W [{prefs.bw ? "ON" : "OFF"}]
          </button>
          <button
            type="button"
            onClick={toggleCrtFx}
            aria-pressed={prefs.crtFx}
            className={`interactive-control rounded-full px-2.5 py-1 font-mono-tech text-[11px] tracking-[0.12em] uppercase ${
              prefs.crtFx
                ? "text-[var(--accent)] hover:text-[var(--ink-primary)]"
                : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
            }`}
          >
            CRT [{prefs.crtFx ? "ON" : "OFF"}]
          </button>
        </div>

        <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-white/[0.11] bg-[#08090d]/92 px-3.5 py-1 shadow-[0_6px_20px_rgba(0,0,0,0.65)]">
          <span className="font-mono-tech text-[11px] tracking-[0.12em] text-[var(--ink-muted)] uppercase tabular-nums">
            CH-{activeChapter.code} · {activeChapter.label}
          </span>
          <span className="text-white/20" aria-hidden="true">
            |
          </span>
          <span className="hidden font-mono-tech text-[11px] tracking-[0.12em] text-[var(--ink-secondary)] uppercase lg:inline">
            SOURCE: WEB
          </span>
          <span className="hidden text-white/20 lg:inline" aria-hidden="true">
            |
          </span>
          <Link
            href="/#contacto"
            className="interactive-control py-1 font-mono-tech text-[11px] tracking-[0.12em] text-[var(--ink-primary)] uppercase hover:text-[var(--accent)]"
          >
            EMAIL
          </Link>
        </div>
      </div>
    </>
  );
}
