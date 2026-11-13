"use client";

import dynamic from "next/dynamic";
import React, { MouseEvent as ReactMouseEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CanvasRevealEffect = dynamic(
  () => import("@/components/ui/canvas-reveal-effect").then((mod) => mod.CanvasRevealEffect),
  { ssr: false }
);

const SPOTLIGHT_COLORS = [
  [56, 189, 248],
  [59, 130, 246],
  [139, 92, 246],
];

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#13161f",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    overlay.style.setProperty("--spot-x", `${clientX - left}px`);
    overlay.style.setProperty("--spot-y", `${clientY - top}px`);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative rounded-xl border border-neutral-800 bg-black p-8",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <div
        ref={overlayRef}
        className="crt-bw-target pointer-events-none absolute -inset-px z-0 rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), white, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(${radius}px circle at var(--spot-x, 50%) var(--spot-y, 50%), white, transparent 80%)`,
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={5}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={SPOTLIGHT_COLORS}
            dotSize={3}
          />
        )}
      </div>
      {children}
    </div>
  );
};
