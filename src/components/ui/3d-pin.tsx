"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  const innerContent = (
    <>
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 top-1/2 flex items-start justify-start overflow-hidden rounded-2xl border border-white/[0.12] bg-[#080a0e] p-4 shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition duration-700 group-hover/pin:border-[var(--border-strong)]"
        >
          <div className={cn("relative z-20", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} />
    </>
  );

  const sharedClassName = cn(
    "relative group/pin z-10 block h-[22rem] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-2xl",
    href ? "cursor-pointer" : "cursor-default",
    containerClassName
  );

  if (!href) {
    return (
      <div
        tabIndex={0}
        className={sharedClassName}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onMouseEnter}
        onBlur={onMouseLeave}
      >
        {innerContent}
      </div>
    );
  }

  return (
    <a
      className={sharedClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {innerContent}
    </a>
  );
};

export const PinPerspective = ({ title }: { title?: string }) => {
  return (
    <div className="pointer-events-none z-30 flex h-80 w-full max-w-[24rem] mx-auto items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100 group-focus-visible/pin:opacity-100">
      <div className="relative -mt-7 h-full w-full flex-none">
        <div className="absolute inset-x-0 top-0 flex justify-center px-3">
          <span className="relative z-10 flex max-w-full items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/15">
            <span className="relative z-20 inline-block truncate py-0.5 font-mono-tech text-xs font-bold text-white">
              {title}
            </span>
            <span
              className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--status-ok), transparent)",
              }}
            />
          </span>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          {[0, 2, 4].map((delaySec) => (
            <div
              key={delaySec}
              style={{ animationDelay: `${delaySec}s` }}
              className="pin-pulse absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-[var(--accent)]/[0.08] opacity-0 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            />
          ))}
        </div>

        <>
          <div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-[var(--accent)] blur-[2px] transition-all duration-300 group-hover/pin:h-40" />
          <div className="absolute right-1/2 bottom-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-[var(--accent)] transition-all duration-300 group-hover/pin:h-40" />
          <div className="absolute right-1/2 bottom-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-[var(--accent)] blur-[3px]" />
          <div className="absolute right-1/2 bottom-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-[var(--ink-primary)]" />
        </>
      </div>
    </div>
  );
};
