"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { TegrityBrandLockup } from "@/components/TegrityLogo";
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

const NAV_ITEMS: Array<{ id: SectionId; label: string; href: string }> = [
  { id: "servicios", label: "Servicios", href: "/#servicios" },
  { id: "proyectos", label: "Proyectos", href: "/#proyectos" },
  { id: "nosotros", label: "Nosotros", href: "/#nosotros" },
  { id: "faq", label: "Preguntas", href: "/#faq" },
];

function getActiveSectionSnapshot(): SectionId {
  return getScrollTelemetry().activeSection;
}

function getActiveSectionServerSnapshot(): SectionId {
  return "inicio";
}

function formatTimecode(seconds: number): string {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const activeSection = useSyncExternalStore(
    subscribeActiveSection,
    getActiveSectionSnapshot,
    getActiveSectionServerSnapshot
  );

  const crtPrefs = useSyncExternalStore(
    subscribeCrtPreferences,
    getCrtPreferencesSnapshot,
    getCrtPreferencesServerSnapshot
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const activeChapter =
    SECTION_CHAPTERS.find((chapter) => chapter.id === activeSection) ??
    SECTION_CHAPTERS[0];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.08] bg-[#07080b]/92 pt-[16px] sm:pt-[22px]">
      <div className="mx-auto flex h-[64px] max-w-7xl items-center justify-between gap-3 px-6 sm:h-[70px] sm:px-12 lg:px-16 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        {/* Left OSD Channel / Timecode on XL, Brand Lockup on Mobile/Tablet */}
        <div className="flex items-center gap-4">
          <Link
            href="/#inicio"
            onClick={closeMenu}
            className="interactive-control inline-flex min-h-[44px] items-center rounded-lg pr-1 focus-visible:outline-2 xl:hidden"
            aria-label="Tegrity-Soft, volver al inicio"
          >
            <TegrityBrandLockup compact markClassName="h-7 w-8" />
          </Link>

          <div className="hidden items-center gap-4 xl:flex">
            <Link
              href="/#inicio"
              className="interactive-control inline-flex min-h-[40px] items-center gap-2 rounded-md px-2 font-mono-tech text-xs tracking-[0.16em] text-[var(--ink-secondary)] uppercase hover:text-[var(--ink-primary)]"
            >
              <span
                aria-hidden="true"
                className={`inline-block h-1.5 w-1.5 ${
                  pathname === "/" && activeSection === "inicio"
                    ? "bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                    : "bg-[var(--ink-muted)]"
                }`}
              />
              <span>INICIO</span>
            </Link>

            <span
              className="font-mono-tech text-xs tracking-[0.14em] text-[var(--ink-muted)] tabular-nums"
              aria-label="Tiempo de transmisión en sesión"
            >
              {formatTimecode(elapsedSeconds)}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono-tech text-[10px] tracking-[0.14em] text-[var(--ink-muted)] uppercase tabular-nums">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-ok)]" aria-hidden="true" />
              CH-{activeChapter.code}
            </span>
          </div>
        </div>

        {/* Centered Retro TV Brand Badge on XL Desktop */}
        <div className="hidden justify-center xl:flex">
          <Link
            href="/#inicio"
            onClick={closeMenu}
            className="interactive-control inline-flex min-h-[44px] items-center rounded-lg px-3 focus-visible:outline-2"
            aria-label="Tegrity-Soft, volver al inicio"
          >
            <TegrityBrandLockup markClassName="h-8 w-9" />
          </Link>
        </div>

        {/* Navigation & Primary CTA */}
        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navegación principal"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === "/" && activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`interactive-control relative inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2.5 font-mono-tech text-xs tracking-[0.12em] uppercase lg:px-3 ${
                    isActive
                      ? "font-semibold text-[var(--ink-primary)]"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 bg-[var(--accent)]"
                    />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Link
            href="/#contacto"
            onClick={closeMenu}
            className="interactive-control hidden min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--accent)] px-3.5 font-mono-tech text-xs font-bold tracking-[0.1em] text-[var(--accent-ink)] uppercase hover:bg-[var(--accent-hover)] sm:inline-flex"
          >
            <span>Cotizar</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="interactive-control inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.12] bg-[#101218] text-[var(--ink-primary)] md:hidden"
            aria-label={mobileMenuOpen ? "Cerrar menú de canales" : "Abrir menú de canales"}
            aria-expanded={mobileMenuOpen}
            aria-controls="navegacion-movil"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Retro TV Channel Selector Drawer */}
      {mobileMenuOpen && (
        <div
          id="navegacion-movil"
          data-lenis-prevent
          className="fixed inset-x-3 top-[80px] bottom-4 z-[48] flex flex-col justify-between overflow-y-auto rounded-[20px] border border-white/[0.1] bg-[#07080b]/98 px-4 py-6 sm:inset-x-6 sm:top-[92px] sm:bottom-6 sm:rounded-[28px] md:hidden"
        >
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono-tech text-[11px] tracking-[0.14em] text-[var(--ink-muted)] uppercase">
              <span>MENU OSD // CANALES</span>
              <span>CH-{activeChapter.code}</span>
            </div>

            <nav className="flex flex-col gap-2" aria-label="Menú móvil">
              <Link
                href="/#inicio"
                onClick={closeMenu}
                className="interactive-control flex min-h-[50px] items-center justify-between rounded-xl border border-transparent px-4 font-mono-tech text-sm tracking-[0.12em] text-[var(--ink-primary)] uppercase hover:bg-[#111319]"
              >
                <span>01 · Inicio</span>
                <ArrowUpRight className="h-4 w-4 text-[var(--ink-muted)]" aria-hidden="true" />
              </Link>
              {NAV_ITEMS.map((item, idx) => {
                const isActive = pathname === "/" && activeSection === item.id;
                const code = String(idx + 2).padStart(2, "0");
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "location" : undefined}
                    className={`interactive-control flex min-h-[50px] items-center justify-between rounded-xl border px-4 font-mono-tech text-sm tracking-[0.12em] uppercase ${
                      isActive
                        ? "border-[var(--border-strong)] bg-[#111319] font-semibold text-[var(--accent)]"
                        : "border-transparent text-[var(--ink-primary)] hover:bg-[#111319]"
                    }`}
                  >
                    <span>
                      {isActive ? "■ " : ""}
                      {code} · {item.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--ink-muted)]" aria-hidden="true" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-4 border-t border-white/[0.08] pt-5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleCrtBw}
                aria-pressed={crtPrefs.bw}
                className={`interactive-control min-h-[44px] flex-1 rounded-lg border px-3 font-mono-tech text-xs tracking-[0.12em] uppercase ${
                  crtPrefs.bw
                    ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] font-bold text-[#060709]"
                    : "border-white/[0.12] bg-[#111319] text-[var(--ink-secondary)]"
                }`}
              >
                B&amp;W [{crtPrefs.bw ? "ON" : "OFF"}]
              </button>
              <button
                type="button"
                onClick={toggleCrtFx}
                aria-pressed={crtPrefs.crtFx}
                className={`interactive-control min-h-[44px] flex-1 rounded-lg border px-3 font-mono-tech text-xs tracking-[0.12em] uppercase ${
                  crtPrefs.crtFx
                    ? "border-[var(--border-strong)] bg-[#111319] text-[var(--accent)]"
                    : "border-white/[0.12] bg-[#111319] text-[var(--ink-muted)]"
                }`}
              >
                CRT [{crtPrefs.crtFx ? "ON" : "OFF"}]
              </button>
            </div>

            <Link
              href="/#contacto"
              onClick={closeMenu}
              className="interactive-control flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 font-mono-tech text-sm font-bold tracking-[0.1em] text-[var(--accent-ink)] uppercase"
            >
              <span>Solicitar proyecto</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
