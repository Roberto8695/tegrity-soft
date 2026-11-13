"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  createScope,
  createTimeline,
  onScroll,
  stagger,
  text,
} from "animejs";
import { ArrowRight, Pause, Play, Layers, MonitorSmartphone, Zap } from "lucide-react";
import { TegrityLogoMark } from "@/components/TegrityLogo";
import { pulseStageFromElement } from "@/lib/stage-director";
import { proyectos } from "@/data/proyectos";

const CORE_CAPABILITIES = [
  {
    code: "01",
    icon: MonitorSmartphone,
    title: "Diseño UI/UX y Responsivo",
    description: "Interfaces claras que se adaptan con precisión de 320px a escritorio.",
  },
  {
    code: "02",
    icon: Layers,
    title: "Desarrollo Next.js y E-commerce",
    description: "Aplicaciones escalables, CMS autoadministrables y APIs a medida.",
  },
  {
    code: "03",
    icon: Zap,
    title: "Rendimiento y SEO Técnico",
    description: "Carga rápida desde el primer byte, contraste AA y estructura indexable.",
  },
];

const BROADCAST_SPECS = [
  {
    label: "PRODUCCIÓN",
    value: `${String(proyectos.length).padStart(2, "0")} PROYECTOS ACTIVOS`,
  },
  { label: "PAQUETES", value: "COTIZACIÓN A MEDIDA" },
  { label: "GARANTÍA", value: "30 DÍAS INCLUIDOS" },
];

const PVM_TUBE_HOLE =
  "M 38 14 Q 400 2 762 14 C 783 16 792 27 794 52 Q 800 225 794 398 C 792 423 783 434 762 436 Q 400 448 38 436 C 17 434 8 423 6 398 Q 0 225 6 52 C 8 27 17 16 38 14 Z";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scrambleLabelRef = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const isPlaying = userPaused === null ? !reducedMotion : !userPaused;

  const triggerTelemetryPulse = useCallback(
    (event?: React.SyntheticEvent<HTMLElement>) => {
      if (reducedMotion || !heroRef.current) return;

      if (event?.type === "click") {
        pulseStageFromElement(event.currentTarget, "#38bdf8");
      }

      const dotNodes = heroRef.current.querySelectorAll("[data-hero-dot]");
      if (dotNodes.length > 0) {
        animate(dotNodes, {
          scale: [1, 1.75, 0.9, 1],
          opacity: [0.65, 1, 0.75],
          delay: stagger(32, { grid: [6, 2], from: "center" }),
          duration: 620,
          ease: "outExpo",
        });
      }

      if (scrambleLabelRef.current) {
        animate(scrambleLabelRef.current, {
          innerHTML: text.scrambleText({
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·",
            revealRate: 55,
            settleDuration: 220,
            from: "left",
          }),
        });
      }
    },
    [reducedMotion]
  );

  useEffect(() => {
    if (reducedMotion && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }

    if (reducedMotion || !heroRef.current) return;

    const rootEl = heroRef.current;
    const scope = createScope({ root: rootEl }).add(() => {
      const introTl = createTimeline({
        defaults: { ease: "outExpo", duration: 640 },
      });

      introTl.add("[data-hero-stage]", {
        y: [14, 0],
        opacity: [0.92, 1],
        duration: 680,
      });

      animate("[data-hero-dot]", {
        scale: [0.7, 1.35, 1],
        opacity: [0.4, 1, 0.72],
        delay: stagger(35, { grid: [6, 2], from: "center" }),
        duration: 720,
        ease: "outExpo",
      });

      animate("[data-hero-stage]", {
        y: [0, -24],
        ease: "linear",
        autoplay: onScroll({
          target: rootEl,
          enter: "start start",
          leave: "end start",
          sync: 0.35,
        }),
      });
    });

    return () => {
      scope.revert();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || userPaused === true) return;

    let cancelled = false;
    const startPlayback = () => {
      if (cancelled || !videoRef.current || !videoRef.current.paused) return;
      videoRef.current.play().catch(() => {});
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(startPlayback, { timeout: 600 });
      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(idleId);
      };
    }

    const timer = window.setTimeout(startPlayback, 160);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reducedMotion, userPaused]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setUserPaused(true);
    } else {
      void video.play().catch(() => {});
      setUserPaused(false);
    }
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="section-backdrop-primary relative flex min-h-[100svh] items-center border-b border-white/[0.06] pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Primary Value Proposition */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={triggerTelemetryPulse}
              onMouseEnter={triggerTelemetryPulse}
              className="interactive-control mb-5 inline-flex max-w-full items-center gap-3 rounded-full border border-white/[0.12] bg-[#0b0d12]/90 px-3.5 py-1.5 backdrop-blur-sm hover:border-[var(--border-strong)]"
              aria-label="Activar pulso de matriz interactiva"
            >
              <span className="grid grid-cols-6 gap-1" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    data-hero-dot
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                  />
                ))}
              </span>
              <span
                ref={scrambleLabelRef}
                className="truncate font-mono-tech text-[11px] font-medium tracking-[0.12em] text-[var(--ink-secondary)] uppercase"
              >
                CH-01 · NEXT.JS · THREE.JS · ANIME.JS
              </span>
            </button>

            <h1
              data-hero-lead
              className="font-display text-4xl leading-[1.06] font-bold tracking-tight text-[var(--ink-primary)] sm:text-5xl lg:text-[3.35rem]"
            >
              Sitios y software web desarrollados con velocidad real.
            </h1>

            <p
              data-hero-lead
              className="mt-5 max-w-[60ch] text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg"
            >
              Diseñamos plataformas digitales rápidas, claras y escalables. desde landing pages hasta sistemas
              e-commerce a medida.
            </p>

            {/* Retro Broadcast Tabular Spec Readout */}
            <dl
              data-hero-lead
              className="mt-6 space-y-2 rounded-xl border border-white/[0.09] bg-[#0b0d12]/80 px-4 py-3.5 font-mono-tech text-xs tracking-[0.08em]"
            >
              {BROADCAST_SPECS.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <dt className="shrink-0 text-[var(--ink-muted)]">{item.label}</dt>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 border-b border-dashed border-white/[0.14]"
                  />
                  <dd className="shrink-0 font-semibold text-[var(--ink-primary)] tabular-nums">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Focused Primary & Secondary Actions */}
            <div
              data-hero-lead
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/#contacto"
                data-stage-target="true"
                data-stage-accent="#34d399"
                className="interactive-control inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 text-base font-bold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
              >
                <span>Solicitar proyecto</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href="/#proyectos"
                data-stage-target="true"
                data-stage-accent="#38bdf8"
                className="interactive-control inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/[0.14] bg-[#111319] px-6 text-base font-medium text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
              >
                Ver proyectos
              </Link>
            </div>
          </div>

          {/* Right Architectural Stage: Retro PVM / CRT Television Monitor */}
          <div
            data-hero-stage
            data-stage-target="true"
            data-stage-accent="#818cf8"
            className="lg:col-span-6"
          >
            <div className="relative rounded-[26px] border border-white/[0.14] bg-gradient-to-b from-[#171920] via-[#0e1015] to-[#08090c] p-3 shadow-[0_28px_70px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.1)] sm:p-4">
              {/* Top Monitor Bezel Plate */}
              <div className="mb-2.5 flex items-center justify-between gap-2 px-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  <TegrityLogoMark className="h-5 w-6 text-[var(--ink-primary)]" />
                  <span className="truncate font-mono-tech text-[11px] font-semibold tracking-[0.14em] text-[var(--ink-secondary)] uppercase">
                    TEGRITY // PVM-01
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2 font-mono-tech text-[11px] tracking-[0.12em] uppercase">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded bg-white/[0.06] px-2 py-0.5 ${
                      isPlaying ? "text-[var(--status-ok)]" : "text-[var(--accent)]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${
                        isPlaying ? "bg-[var(--status-ok)]" : "bg-[var(--accent)]"
                      }`}
                    />
                    {isPlaying ? "REC" : "STILL"}
                  </span>
                  <span className="text-[var(--ink-muted)]">CH-01</span>
                </div>
              </div>

              {/* Recessed Bowed CRT Screen Tube */}
              <div className="relative overflow-hidden rounded-[20px] bg-[#040507] p-1">
                <div className="relative aspect-video w-full overflow-hidden rounded-[16px]">
                  <Image
                    src="/media/tegrity-poster.webp"
                    alt=""
                    aria-hidden="true"
                    fill
                    priority
                    quality={75}
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                  <video
                    ref={videoRef}
                    className={`relative z-[1] block h-full w-full object-cover transition-opacity duration-300 ${
                      videoReady ? "opacity-100" : "opacity-0"
                    }`}
                    loop
                    muted
                    playsInline
                    preload="none"
                    width={1280}
                    height={720}
                    onLoadedData={() => setVideoReady(true)}
                    onPlay={() => {
                      setVideoReady(true);
                      setUserPaused(false);
                    }}
                    onPause={() => setUserPaused(true)}
                    aria-label="Demostración animada del flujo de ingeniería web de Tegrity-Soft"
                  >
                    <source src="/media/tegrity-showcase.mp4" type="video/mp4" />
                    <source src="/media/tegrity-showcase.webm" type="video/webm" />
                  </video>

                  {/* Monitor Inner CRT Glass Scanlines */}
                  <div
                    aria-hidden="true"
                    className="crt-scanlines pointer-events-none absolute inset-0"
                  />

                  {/* Bowed CRT Barrel Mask, Inner Tube Shadow & Glass Glare */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 800 450"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <clipPath id="pvmTubeClip">
                        <path d={PVM_TUBE_HOLE} />
                      </clipPath>
                      <linearGradient id="pvmGlare" x1="0%" y1="0%" x2="100%" y2="30%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="40%" stopColor="rgba(255,255,255,0.03)" />
                        <stop offset="52%" stopColor="rgba(255,255,255,0.065)" />
                        <stop offset="65%" stopColor="rgba(255,255,255,0.015)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>
                    <g clipPath="url(#pvmTubeClip)">
                      <path
                        d={PVM_TUBE_HOLE}
                        fill="none"
                        stroke="rgba(0,0,0,0.45)"
                        strokeWidth="36"
                      />
                      <path
                        d={PVM_TUBE_HOLE}
                        fill="none"
                        stroke="rgba(0,0,0,0.88)"
                        strokeWidth="14"
                      />
                      <polygon
                        points="220,0 520,0 700,450 400,450"
                        fill="url(#pvmGlare)"
                      />
                    </g>
                    <path
                      d={`M 0 0 H 800 V 450 H 0 Z ${PVM_TUBE_HOLE}`}
                      fill="#040507"
                      fillRule="evenodd"
                    />
                    <path
                      d={PVM_TUBE_HOLE}
                      fill="none"
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Subtle In-Screen Broadcast OSD Markers */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-5 top-3.5 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.14em] text-white/75 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    <span>{isPlaying ? "PLAY ▶" : "PAUSE ❚❚"}</span>
                    <span>AV-1 // HD</span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-5 bottom-3.5 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.12em] text-white/65 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                  >
                    <span>TEGRITY-SHOWCASE</span>
                    <span>1280×720 · 60FPS</span>
                  </div>
                </div>
              </div>

              {/* Monitor Bottom Physical Control Deck */}
              <div className="mt-2.5 flex items-center justify-between gap-2 px-1">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      isPlaying
                        ? "bg-[var(--status-ok)] shadow-[0_0_8px_var(--status-ok)]"
                        : "bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                    }`}
                  />
                  <span className="truncate font-mono-tech text-[11px] text-[var(--ink-muted)]">
                    arquitectura-en-produccion.mp4
                  </span>
                </div>

                <button
                  type="button"
                  onClick={togglePlayback}
                  aria-label={
                    isPlaying
                      ? "Pausar video de arquitectura"
                      : "Reproducir video de arquitectura"
                  }
                  className="interactive-control inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#161922] px-3.5 font-mono-tech text-xs font-medium tracking-[0.08em] text-[var(--ink-primary)] uppercase hover:border-[var(--border-strong)]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Reproducir</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Concise Architectural Capabilities Strip inside Hero */}
        <div
          data-hero-lead
          className="mt-10 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3 sm:gap-6 lg:mt-14"
        >
          {CORE_CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div key={cap.title} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-[#111319] text-[var(--accent)]"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-[10px] tracking-[0.14em] text-[var(--accent)]">
                      [{cap.code}]
                    </span>
                    <h2 className="font-display text-base font-semibold text-[var(--ink-primary)]">
                      {cap.title}
                    </h2>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {cap.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
