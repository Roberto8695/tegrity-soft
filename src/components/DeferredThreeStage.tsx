"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThreeImmersiveStage = dynamic(
  () => import("@/components/ThreeImmersiveStage").then((mod) => mod.ThreeImmersiveStage),
  { ssr: false }
);

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

/**
 * Difiere la carga e inicialización del bundle Three.js fuera de la ruta crítica
 * inicial para priorizar LCP, fuentes y primer pintado del Hero.
 */
export function DeferredThreeStage() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const nav = navigator as NavigatorWithConnection;
    if (nav.connection?.saveData) {
      return;
    }

    let cancelled = false;
    const activate = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(activate, { timeout: 600 });
      return () => {
        cancelled = true;
        win.cancelIdleCallback?.(idleId);
      };
    }

    const timer = window.setTimeout(activate, 140);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <ThreeImmersiveStage />;
}
