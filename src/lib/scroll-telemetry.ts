import type Lenis from "lenis";

export type SectionId =
  | "inicio"
  | "servicios"
  | "proyectos"
  | "nosotros"
  | "faq"
  | "contacto";

export interface SectionChapter {
  id: SectionId;
  code: string;
  label: string;
}

export const SECTION_CHAPTERS: readonly SectionChapter[] = [
  { id: "inicio", code: "01", label: "Inicio" },
  { id: "servicios", code: "02", label: "Servicios" },
  { id: "proyectos", code: "03", label: "Proyectos" },
  { id: "nosotros", code: "04", label: "Equipo" },
  { id: "faq", code: "05", label: "FAQ" },
  { id: "contacto", code: "06", label: "Contacto" },
] as const;

export interface ScrollTelemetrySnapshot {
  scrollY: number;
  progress: number;
  velocity: number;
  direction: 1 | -1;
  activeSection: SectionId;
}

const telemetryState: ScrollTelemetrySnapshot = {
  scrollY: 0,
  progress: 0,
  velocity: 0,
  direction: 1,
  activeSection: "inicio",
};

let activeLenis: Lenis | null = null;

type FrameListener = (snapshot: ScrollTelemetrySnapshot) => void;
type SectionListener = (section: SectionId) => void;

const frameListeners = new Set<FrameListener>();
const sectionListeners = new Set<SectionListener>();

export function registerLenisInstance(instance: Lenis | null) {
  activeLenis = instance;
}

export function getScrollTelemetry(): Readonly<ScrollTelemetrySnapshot> {
  return telemetryState;
}

export function publishScrollTelemetry(
  partial: Partial<ScrollTelemetrySnapshot>
) {
  const prevSection = telemetryState.activeSection;
  Object.assign(telemetryState, partial);

  frameListeners.forEach((listener) => listener(telemetryState));

  if (partial.activeSection && partial.activeSection !== prevSection) {
    sectionListeners.forEach((listener) => listener(telemetryState.activeSection));
  }
}

export function subscribeScrollTelemetry(listener: FrameListener): () => void {
  frameListeners.add(listener);
  return () => frameListeners.delete(listener);
}

export function subscribeActiveSection(listener: SectionListener): () => void {
  sectionListeners.add(listener);
  return () => sectionListeners.delete(listener);
}

/**
 * Computes which primary page section is currently aligned with the viewport focal band.
 */
export function detectActiveSectionFromViewport(): SectionId {
  if (typeof window === "undefined") return "inicio";

  const focusY = window.innerHeight * 0.36;
  let candidate: SectionId = "inicio";

  for (const chapter of SECTION_CHAPTERS) {
    const el = document.getElementById(chapter.id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= focusY) {
      candidate = chapter.id;
    }
  }

  return candidate;
}

/**
 * Smoothly scrolls to a section ID using Lenis when available, falling back to native scroll.
 */
export function scrollToSection(
  targetId: string,
  options?: { immediate?: boolean }
) {
  if (typeof window === "undefined") return;

  const cleanId = targetId.replace(/^\/?#/, "");
  const element = document.getElementById(cleanId);
  if (!element) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const immediate = Boolean(options?.immediate || prefersReduced);

  if (activeLenis) {
    activeLenis.scrollTo(element, {
      offset: -72,
      immediate,
      duration: immediate ? 0 : 1.05,
    });
    return;
  }

  element.scrollIntoView({
    behavior: immediate ? "auto" : "smooth",
    block: "start",
  });
}
