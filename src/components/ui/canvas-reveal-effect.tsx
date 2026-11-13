"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  totalSize?: number;
  showGradient?: boolean;
  center?: ("x" | "y")[];
}

const DEFAULT_OPACITIES = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1];
const DEFAULT_COLORS = [[0, 255, 255]];

function hash2D(x: number, y: number, seed = 0): number {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453123;
  return n - Math.floor(n);
}

/**
 * Renderizador ligero en Canvas 2D para el efecto de matriz de puntos al hacer hover,
 * evitando cargar WebGL / React Three Fiber en las tarjetas de servicio.
 */
export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed = 0.4,
  opacities = DEFAULT_OPACITIES,
  colors = DEFAULT_COLORS,
  containerClassName,
  dotSize = 3,
  totalSize = 4,
  showGradient = true,
  center = ["x", "y"],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const centerX = center.includes("x");
  const centerY = center.includes("y");

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const palette =
      colors.length >= 6
        ? colors
        : colors.length === 2
          ? [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]]
          : colors.length === 3
            ? [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]]
            : Array.from({ length: 6 }, () => colors[0] ?? [0, 255, 255]);

    const colorStrings = palette.map(
      ([r, g, b]) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
    );
    const safeOpacities = opacities.length > 0 ? opacities : DEFAULT_OPACITIES;
    const step = Math.max(dotSize + 1, totalSize);
    const speedFactor = 0.02 * animationSpeed;
    const targetInterval = 1000 / 30;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let startTime = 0;
    let lastDrawTime = 0;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const drawFrame = (elapsedSec: number) => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);

      const offsetX = centerX ? ((width % step) / 2) : 0;
      const offsetY = centerY ? ((height % step) / 2) : 0;
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);
      const originX = centerX ? cols * 0.5 : 0;
      const originY = centerY ? rows * 0.5 : 0;
      const timeStep = Math.floor(elapsedSec * 5);
      const waveThreshold = elapsedSec * (0.28 + animationSpeed * 0.08);

      for (let row = 0; row < rows; row++) {
        const y = offsetY + row * step;
        const dy = (row - originY) * step;

        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * step;
          const dx = (col - originX) * step;
          const dist = Math.hypot(dx, dy) * 0.01;
          const baseRand = hash2D(col, row);
          const introOffset = dist + baseRand * 0.15;

          if (waveThreshold <= introOffset) continue;

          const flickerRand = hash2D(col, row, timeStep + 1);
          const opacityIdx = Math.min(
            safeOpacities.length - 1,
            Math.floor(flickerRand * safeOpacities.length)
          );
          let alpha = safeOpacities[opacityIdx];

          // Destello sutil en el borde del frente de onda
          if (waveThreshold < introOffset + 0.12) {
            alpha = Math.min(1, alpha * 1.25);
          }

          if (alpha <= 0.01) continue;

          const colorIdx = Math.floor(baseRand * colorStrings.length) % colorStrings.length;
          ctx.globalAlpha = alpha;
          ctx.fillStyle = colorStrings[colorIdx];
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }

      ctx.globalAlpha = 1;
    };

    syncSize();

    const resizeObserver = new ResizeObserver(() => {
      syncSize();
      if (reducedMotion) {
        drawFrame(10);
      }
    });
    resizeObserver.observe(container);

    if (reducedMotion) {
      drawFrame(10);
      return () => {
        resizeObserver.disconnect();
      };
    }

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      if (now - lastDrawTime >= targetInterval) {
        lastDrawTime = now;
        const elapsed = ((now - startTime) / 1000) * Math.max(0.4, speedFactor * 12);
        drawFrame(elapsed);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [animationSpeed, centerX, centerY, colors, dotSize, opacities, totalSize]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full relative bg-white w-full overflow-hidden", containerClassName)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none block h-full w-full"
      />
      {showGradient && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};
