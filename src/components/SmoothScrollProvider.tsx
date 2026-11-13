"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  detectActiveSectionFromViewport,
  publishScrollTelemetry,
  registerLenisInstance,
  scrollToSection,
} from "@/lib/scroll-telemetry";

function computeDocumentProgress(scrollY: number): number {
  const maxScroll = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight
  );
  return Math.min(1, Math.max(0, scrollY / maxScroll));
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const broadcastNativeScroll = () => {
      const scrollY = window.scrollY;
      publishScrollTelemetry({
        scrollY,
        progress: computeDocumentProgress(scrollY),
        velocity: 0,
        activeSection: detectActiveSectionFromViewport(),
      });
    };

    if (prefersReduced) {
      registerLenisInstance(null);
      broadcastNativeScroll();
      window.addEventListener("scroll", broadcastNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", broadcastNativeScroll);
      };
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    registerLenisInstance(lenis);

    lenis.on("scroll", (instance: Lenis) => {
      publishScrollTelemetry({
        scrollY: instance.scroll,
        progress: computeDocumentProgress(instance.scroll),
        velocity: instance.velocity,
        direction: instance.direction === -1 ? -1 : 1,
        activeSection: detectActiveSectionFromViewport(),
      });
    });

    // Keep Lenis scroll bounds accurate when dynamic content (FAQ, filter tabs) changes height
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    // Initial broadcast for active section on first frame
    publishScrollTelemetry({
      scrollY: window.scrollY,
      progress: computeDocumentProgress(window.scrollY),
      velocity: 0,
      direction: 1,
      activeSection: detectActiveSectionFromViewport(),
    });

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
      lenisRef.current = null;
      registerLenisInstance(null);
    };
  }, []);

  // Reset or settle scroll smoothly when switching routes (/, /privacidad, /terminos)
  useEffect(() => {
    const hash = window.location.hash;
    if (pathname === "/" && hash) {
      const raf = window.requestAnimationFrame(() => {
        scrollToSection(hash);
      });
      return () => window.cancelAnimationFrame(raf);
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Intercept same-page hash navigation links across Header, Hero & Footer for silky Lenis scroll
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      const isHomeAnchor =
        rawHref.startsWith("#") ||
        (pathname === "/" && rawHref.startsWith("/#"));

      if (!isHomeAnchor) return;

      const id = rawHref.replace(/^\/?#/, "");
      const sectionEl = id ? document.getElementById(id) : null;
      if (!sectionEl) return;

      event.preventDefault();
      scrollToSection(id);
      window.history.replaceState(null, "", `/#${id}`);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [pathname]);

  return <>{children}</>;
}
