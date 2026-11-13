"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { attachSectionScrollFX } from "@/lib/anime-section-fx";
import { pulseStageFromElement } from "@/lib/stage-director";
import {
  buildQuoteWhatsappUrl,
  QUOTE_WHATSAPP_DISPLAY,
  SERVICE_TIERS,
} from "@/data/studio";

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Consulta inicial",
    description: "Definimos objetivos, requerimientos y el paquete adecuado.",
  },
  {
    step: "02",
    title: "Propuesta y diseño",
    description: "Presentamos arquitectura, interfaz y cronograma técnico.",
  },
  {
    step: "03",
    title: "Desarrollo iterativo",
    description: "Avances revisables de forma continua sin cajas negras.",
  },
  {
    step: "04",
    title: "Despliegue y garantía",
    description: "Pruebas, puesta en producción, capacitación y 30 días de garantía.",
  },
];

export function ServiceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return attachSectionScrollFX({
      root: sectionRef.current,
      traceSelector: "[data-service-trace]",
      staggerTargets: [
        {
          selector: "[data-service-card]",
          containerSelector: "[data-services-grid]",
          delayStep: 110,
          from: "first",
        },
        {
          selector: "[data-workflow-step]",
          containerSelector: "[data-workflow-strip]",
          delayStep: 80,
          from: "first",
        },
      ],
    });
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      aria-labelledby="servicios-heading"
      className="section-backdrop-primary section-contain relative border-b border-transparent py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-2 font-mono-tech text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
              [CH-02 // PAQUETES]
            </p>
            <h2
              id="servicios-heading"
              className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl"
            >
              Paquetes de desarrollo web
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
              Alcance definido, código limpio y soporte técnico real según la etapa
              de tu proyecto.
            </p>
          </div>

          <a
            href={buildQuoteWhatsappUrl("Personalizado a medida")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar proyecto a medida por WhatsApp al ${QUOTE_WHATSAPP_DISPLAY}`}
            className="interactive-control inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-sm font-medium text-[var(--ink-primary)] hover:border-[var(--border-strong)] sm:self-auto"
          >
            <span>¿Proyecto a medida? Cotizar</span>
            <ArrowUpRight className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          </a>
        </div>

        {/* Anime.js Scroll-Synced SVG Blueprint Trace */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 14"
          fill="none"
          preserveAspectRatio="none"
          className="mt-8 h-3.5 w-full opacity-80"
        >
          <path
            data-service-trace
            d="M 0 7 H 340 L 352 2 H 580 L 592 12 H 920 L 932 7 H 1200"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Original Interactive CardSpotlight + Three.js DotMatrix Reveal Grid */}
        <div
          data-services-grid
          className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch"
        >
          {SERVICE_TIERS.map((tier, index) => {
            const isHighlighted = Boolean(tier.highlighted);
            const stageAccent = isHighlighted
              ? "#34d399"
              : index === 2
                ? "#818cf8"
                : "#38bdf8";
            return (
              <div
                key={tier.id}
                data-service-card
                data-stage-accent={stageAccent}
                className="flex"
              >
                <CardSpotlight
                  className={`w-full ${
                    isHighlighted
                      ? "border-2 border-[var(--accent)]"
                      : "border border-[var(--border-subtle)]"
                  }`}
                >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[var(--ink-primary)]">
                      {tier.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">
                      {tier.subtitle}
                    </p>
                  </div>
                  {isHighlighted && (
                    <span className="inline-flex shrink-0 items-center rounded-md bg-[var(--accent)] px-2.5 py-1 font-mono-tech text-xs font-bold text-[var(--accent-ink)]">
                      Más popular
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between gap-2 border-y border-white/10 py-3 font-mono-tech text-xs">
                  <span className="text-[var(--accent)]">{tier.timeline}</span>
                  <span className="text-[var(--ink-muted)] uppercase">
                    Cotización a medida
                  </span>
                </div>

                {tier.leadIn && (
                  <p className="mt-4 text-sm font-semibold text-[var(--ink-primary)]">
                    {tier.leadIn}
                  </p>
                )}

                <ul
                  className={`${tier.leadIn ? "mt-3" : "mt-5"} flex-1 space-y-3`}
                >
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[15px] leading-snug text-[var(--ink-secondary)]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <a
                    href={buildQuoteWhatsappUrl(tier.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${tier.ctaLabel} del plan ${tier.name} por WhatsApp al ${QUOTE_WHATSAPP_DISPLAY}`}
                    onClick={(event) => {
                      pulseStageFromElement(
                        event.currentTarget,
                        isHighlighted ? "#34d399" : "#38bdf8"
                      );
                    }}
                    className={`interactive-control inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg px-5 text-base font-bold ${
                      isHighlighted
                        ? "bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
                        : "border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <span>{tier.ctaLabel}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </CardSpotlight>
              </div>
            );
          })}
        </div>

        {/* Concise Engineering Process Strip */}
        <div
          data-workflow-strip
          className="mt-14 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/95 p-6 backdrop-blur-sm sm:p-8"
        >
          <h3 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
            Proceso de trabajo
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((item) => (
              <div
                key={item.step}
                data-workflow-step
                data-stage-accent="#38bdf8"
                className="border-t border-[var(--border-subtle)] pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-5 first:border-0 first:pt-0 first:pl-0"
              >
                <span className="font-mono-tech text-xs font-bold text-[var(--accent)]">
                  PASO {item.step}
                </span>
                <h4 className="mt-1.5 font-display text-base font-semibold text-[var(--ink-primary)]">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
