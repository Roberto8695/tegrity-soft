"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { navigateToContact } from "@/lib/contact-intent";
import { attachSectionScrollFX } from "@/lib/anime-section-fx";
import { pulseStageFromElement } from "@/lib/stage-director";
import { FAQ_DATA } from "@/data/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    return attachSectionScrollFX({
      root: sectionRef.current,
      traceSelector: "[data-faq-trace]",
      staggerTargets: [
        {
          selector: "[data-faq-item]",
          containerSelector: "[data-faq-list]",
          delayStep: 45,
          from: "first",
        },
      ],
    });
  }, []);

  const toggleFaq = (index: number, triggerEl?: HTMLElement) => {
    if (triggerEl) {
      pulseStageFromElement(triggerEl, "#34d399");
    }
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className="section-backdrop-primary section-contain relative border-b border-transparent py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono-tech text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
            [CH-05 // PREGUNTAS]
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl"
          >
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
            Respuestas claras sobre tiempos de entrega, precios, mantenimiento y
            tecnologías.
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 900 10"
          fill="none"
          preserveAspectRatio="none"
          className="mt-7 h-2.5 w-full opacity-70"
        >
          <path
            data-faq-trace
            d="M 0 5 H 310 L 320 2 H 580 L 590 8 H 900"
            stroke="var(--accent)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        <div data-faq-list className="mt-8 space-y-3">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;
            const numLabel = String(index + 1).padStart(2, "0");

            return (
              <div
                key={faq.question}
                data-faq-item
                data-stage-accent={isOpen ? "#34d399" : "#38bdf8"}
                className={`rounded-xl border transition-[border-color,background-color] duration-200 ease-[var(--ease-out)] ${
                  isOpen
                    ? "border-[var(--border-strong)] bg-[var(--bg-surface)]"
                    : "border-[var(--border-subtle)] bg-[#0b0d12]"
                }`}
              >
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={(event) => toggleFaq(index, event.currentTarget)}
                    className="interactive-control flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="flex items-baseline gap-3.5 pr-2">
                      <span
                        className="font-mono-tech text-xs font-bold text-[var(--accent)] tabular-nums"
                        aria-hidden="true"
                      >
                        {numLabel}
                      </span>
                      <span className="font-display text-base font-semibold text-[var(--ink-primary)] sm:text-lg">
                        {faq.question}
                      </span>
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[var(--ink-muted)] transition-transform duration-200 ease-[var(--ease-out)] ${
                        isOpen ? "rotate-180 text-[var(--accent)]" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="accordion-panel"
                  data-open={isOpen ? "true" : "false"}
                >
                  <div className="accordion-inner">
                    <div className="border-t border-[var(--border-subtle)] px-5 pt-4 pb-5 sm:px-6 sm:pb-6">
                      <p className="max-w-[68ch] text-base leading-relaxed text-[var(--ink-secondary)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-lg font-semibold text-[var(--ink-primary)]">
              ¿Tienes dudas sobre tu proyecto en particular?
            </h3>
            <p className="mt-1 text-base text-[var(--ink-secondary)]">
              Cuéntanos tu idea y te asesoramos sin compromiso.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigateToContact({ plan: "personalizado" })}
            className="interactive-control inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 text-base font-bold text-[var(--accent-ink)] hover:bg-[var(--accent-hover)]"
          >
            <span>Escribir al equipo</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
