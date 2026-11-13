"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { ExternalLink } from "lucide-react";
import { PinContainer } from "@/components/ui/3d-pin";
import { proyectos, getCategorias, type Proyecto } from "@/data/proyectos";
import { attachSectionScrollFX } from "@/lib/anime-section-fx";
import { pulseStageFromElement } from "@/lib/stage-director";

function ProyectoPinItem({ proyecto }: { proyecto: Proyecto }) {
  const pinTitle = proyecto.link ?? `${proyecto.titulo} · ${proyecto.categoria ?? "Proyecto"}`;

  return (
    <div
      data-project-card
      data-stage-accent="#38bdf8"
      className="flex w-full justify-center"
    >
      <PinContainer title={pinTitle} href={proyecto.link}>
        <div className="flex h-[19rem] w-[16.5rem] flex-col tracking-tight text-slate-100/70 sm:h-[20.5rem] sm:w-[20rem]">
          {/* Imagen del proyecto */}
          <div className="relative mb-3.5 aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-[#0b0d12]">
            <Image
              src={proyecto.imagen}
              alt={`Vista previa del proyecto ${proyecto.titulo}`}
              fill
              quality={75}
              className="object-cover object-top"
              sizes="(max-width: 640px) 264px, 320px"
            />
          </div>

          {/* Contenido del proyecto */}
          <div className="flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-2 font-mono-tech text-[11px] text-[var(--ink-muted)]">
              <span>{proyecto.categoria ?? "Proyecto web"}</span>
              {proyecto.fechaCreacion && (
                <span className="tabular-nums">{proyecto.fechaCreacion}</span>
              )}
            </div>

            <h3 className="mt-1 font-display text-lg font-bold text-[var(--ink-primary)]">
              {proyecto.titulo}
            </h3>

            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              {proyecto.descripcion}
            </p>

            <div className="mt-auto flex items-center justify-between gap-2 pt-3 font-mono-tech text-xs text-[var(--accent)]">
              <span>{proyecto.link ? "Visitar sitio" : "En producción"}</span>
              {proyecto.link && (
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
      </PinContainer>
    </div>
  );
}

export function ProyectosSection() {
  const [selectedCategoria, setSelectedCategoria] = useState<string>("Todos");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasInteractedRef = useRef(false);

  const categorias = useMemo(() => ["Todos", ...getCategorias()], []);

  const proyectosFiltrados = useMemo(() => {
    if (selectedCategoria === "Todos") {
      return proyectos;
    }
    return proyectos.filter((item) => item.categoria === selectedCategoria);
  }, [selectedCategoria]);

  useEffect(() => {
    if (!sectionRef.current) return;
    return attachSectionScrollFX({
      root: sectionRef.current,
      traceSelector: "[data-projects-trace]",
      staggerTargets: [
        {
          selector: "[data-project-card]",
          containerSelector: "[data-projects-grid]",
          delayStep: 80,
          from: "first",
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (!hasInteractedRef.current || !gridRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gridRef.current.querySelectorAll("[data-project-card]");
    if (cards.length === 0) return;

    const anim = animate(cards, {
      y: [16, 0],
      scale: [0.96, 1],
      opacity: [0.35, 1],
      duration: 420,
      delay: stagger(65, { from: "first" }),
      ease: "outExpo",
    });

    return () => {
      anim.revert();
    };
  }, [selectedCategoria]);

  const handleSelectCategoria = (categoria: string, triggerEl: HTMLElement) => {
    hasInteractedRef.current = true;
    pulseStageFromElement(triggerEl, "#38bdf8");
    setSelectedCategoria(categoria);
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      aria-labelledby="proyectos-heading"
      className="section-backdrop-primary section-contain relative border-b border-transparent py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-2 font-mono-tech text-xs tracking-[0.16em] text-[var(--accent)] uppercase">
              [CH-03 // PORTAFOLIO]
            </p>
            <h2
              id="proyectos-heading"
              className="font-display text-3xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-4xl"
            >
              Proyectos en producción
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--ink-secondary)] sm:text-lg">
              Sitios informativos, tiendas en línea y plataformas cívicas desplegadas
              para clientes en Bolivia y Estados Unidos.
            </p>
          </div>

          <p className="font-mono-tech text-sm text-[var(--ink-muted)] tabular-nums">
            Mostrando {proyectosFiltrados.length} de {proyectos.length} proyectos
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="group"
          aria-label="Filtrar proyectos por categoría"
          className="mt-8 flex flex-wrap gap-2.5"
        >
          {categorias.map((categoria) => {
            const isActive = selectedCategoria === categoria;
            return (
              <button
                key={categoria}
                type="button"
                aria-pressed={isActive}
                onClick={(event) => handleSelectCategoria(categoria, event.currentTarget)}
                className={`interactive-control inline-flex min-h-[44px] items-center rounded-lg px-4 text-sm font-medium ${
                  isActive
                    ? "bg-[var(--accent)] font-bold text-[var(--accent-ink)]"
                    : "border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)]"
                }`}
              >
                {categoria}
              </button>
            );
          })}
        </div>

        {/* Anime.js Scroll-Synced SVG Underline Trace */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 12"
          fill="none"
          preserveAspectRatio="none"
          className="mt-6 h-3 w-full opacity-75"
        >
          <path
            data-projects-trace
            d="M 0 6 H 260 L 270 11 H 740 L 750 2 H 1200"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        {/* Original 3D Pin Grid */}
        <div
          ref={gridRef}
          data-projects-grid
          className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {proyectosFiltrados.map((proyecto) => (
            <ProyectoPinItem key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </div>
    </section>
  );
}
