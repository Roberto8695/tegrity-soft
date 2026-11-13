"use client";

import React, { useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard";
import { navigateToContact } from "@/lib/contact-intent";
import { attachSectionScrollFX } from "@/lib/anime-section-fx";
import { pulseStageFromElement } from "@/lib/stage-director";
import { TEAM_MEMBERS } from "@/data/studio";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return attachSectionScrollFX({
      root: sectionRef.current,
      traceSelector: "[data-team-trace]",
      staggerTargets: [
        {
          selector: "[data-team-card]",
          containerSelector: "[data-team-grid]",
          delayStep: 120,
          from: "center",
        },
      ],
    });
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      aria-labelledby="nosotros-heading"
      className="section-backdrop-primary section-contain relative border-b border-transparent py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono-tech text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
            [CH-04 // EQUIPO]
          </p>
          <h2
            id="nosotros-heading"
            className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl"
          >
            Equipo de ingeniería
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
            Conoce al equipo detrás de cada proyecto y contacta directamente con
            quien diseña y desarrolla tu software.
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 1200 12"
          fill="none"
          preserveAspectRatio="none"
          className="mt-7 h-3 w-full opacity-75"
        >
          <path
            data-team-trace
            d="M 0 6 H 460 L 472 2 H 728 L 740 10 H 1200"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        <div
          data-team-grid
          className="mt-10 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-3"
        >
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.handle}
              data-team-card
              data-team-member={member.handle}
              data-stage-accent="#818cf8"
              className="flex items-center justify-center"
            >
              <div className="w-full max-w-sm">
                <ProfileCard
                  name={member.name}
                  title={member.title}
                  handle={member.handle}
                  status={member.status}
                  contactText="Contáctame"
                  avatarUrl={member.avatarUrl}
                  miniAvatarUrl={member.miniAvatarUrl}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  className="w-full"
                  onContactClick={() => {
                    const cardEl = sectionRef.current?.querySelector(
                      `[data-team-member="${member.handle}"]`
                    );
                    if (cardEl) {
                      pulseStageFromElement(cardEl, "#818cf8");
                    }
                    navigateToContact({ specialist: member.name });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
