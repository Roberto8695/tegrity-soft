"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { TegrityBrandLockup } from "@/components/TegrityLogo";

const NAVIGATION_LINKS = [
  { name: "Inicio", href: "/#inicio" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Proyectos", href: "/#proyectos" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Preguntas frecuentes", href: "/#faq" },
  { name: "Contacto", href: "/#contacto" },
];

const LEGAL_LINKS = [
  { name: "Política de privacidad", href: "/privacidad" },
  { name: "Términos de servicio", href: "/terminos" },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub — Roberto Escalera",
    href: "https://github.com/roberto8695",
    icon: Github,
    external: true,
  },
  {
    name: "GitHub — Elias Coca",
    href: "https://github.com/eliascoca85",
    icon: Github,
    external: true,
  },
  {
    name: "LinkedIn — Roberto Escalera",
    href: "https://linkedin.com/in/roberto-escalera",
    icon: Linkedin,
    external: true,
  },
  {
    name: "LinkedIn — Mauricio Coca",
    href: "https://www.linkedin.com/in/mauricio-coca85",
    icon: Linkedin,
    external: true,
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/roberto8695",
    icon: Twitter,
    external: true,
  },
  {
    name: "Correo electrónico",
    href: "mailto:roberto@tegrity-soft.com",
    icon: Mail,
    external: false,
  },
];

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [readyEmail, setReadyEmail] = useState<string | null>(null);

  const handleQuickContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Ingresa un correo electrónico válido.");
      setReadyEmail(null);
      return;
    }

    setError("");
    setReadyEmail(trimmed);
  };

  const mailtoFollowupHref = readyEmail
    ? `mailto:roberto@tegrity-soft.com?subject=${encodeURIComponent(
        "Solicitud de información — Tegrity-Soft"
      )}&body=${encodeURIComponent(
        `Hola equipo de Tegrity-Soft,\n\nPor favor contáctenme al correo: ${readyEmail}`
      )}`
    : undefined;

  return (
    <footer className="section-backdrop-primary relative border-t border-white/[0.08] text-[var(--ink-secondary)]">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 md:pb-24 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link
              href="/#inicio"
              className="interactive-control inline-flex min-h-[44px] items-center rounded-lg pr-2 text-[var(--ink-primary)]"
              aria-label="Tegrity-Soft, volver al inicio"
            >
              <TegrityBrandLockup markClassName="h-8 w-9" />
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--ink-muted)]">
              Estudio de ingeniería y desarrollo web. Creamos plataformas rápidas,
              accesibles y mantenibles para empresas y organizaciones.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    aria-label={social.name}
                    title={social.name}
                    className="interactive-control inline-flex h-[44px] w-[44px] items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--ink-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--ink-primary)]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2">
            <h2 className="font-display text-sm font-semibold text-[var(--ink-primary)]">
              Navegación
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAVIGATION_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[36px] items-center text-sm text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink-primary)]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal Column */}
          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold text-[var(--ink-primary)]">
              Información
            </h2>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[36px] items-center text-sm text-[var(--ink-muted)] transition-colors duration-150 hover:text-[var(--ink-primary)]"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:roberto@tegrity-soft.com"
                  className="inline-flex min-h-[36px] items-center whitespace-nowrap font-mono-tech text-xs text-[var(--accent)] hover:underline"
                >
                  roberto@tegrity-soft.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/59168538548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center whitespace-nowrap font-mono-tech text-xs text-[var(--accent)] hover:underline"
                >
                  +591 68538548 (Cotizaciones)
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/59178452369"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[36px] items-center whitespace-nowrap font-mono-tech text-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
                >
                  +591 78452369
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Email Follow-up Form */}
          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold text-[var(--ink-primary)]">
              Contacto rápido por correo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
              Deja tu correo para iniciar una conversación directa con nuestro equipo.
            </p>

            <form
              onSubmit={handleQuickContactSubmit}
              noValidate
              className="mt-4 space-y-3"
            >
              <div>
                <label
                  htmlFor="footer-email"
                  className="block text-xs font-medium text-[var(--ink-secondary)]"
                >
                  Tu correo electrónico
                </label>
                <input
                  id="footer-email"
                  name="footerEmail"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                    setReadyEmail(null);
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "footer-email-error" : undefined}
                  placeholder="tu@empresa.com"
                  className="mt-1.5 block min-h-[48px] w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 text-base text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]/70 focus:border-[var(--accent)] focus:outline-none"
                />
                {error && (
                  <p
                    id="footer-email-error"
                    role="alert"
                    className="mt-1.5 text-sm text-[#fda4af]"
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="interactive-control inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-2)] px-4 text-sm font-semibold text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
              >
                <span>Preparar correo de contacto</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              </button>
            </form>

            {readyEmail && mailtoFollowupHref && (
              <p
                role="status"
                aria-live="polite"
                className="mt-3 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] p-3 text-sm text-[var(--ink-secondary)]"
              >
                Listo para{" "}
                <span className="font-mono-tech text-[var(--ink-primary)]">
                  {readyEmail}
                </span>
                .{" "}
                <a
                  href={mailtoFollowupHref}
                  className="font-semibold text-[var(--accent)] underline"
                >
                  Abrir tu cliente de correo
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-sm text-[var(--ink-muted)] sm:flex-row">
          <p className="tabular-nums">
            © {COPYRIGHT_YEAR} Tegrity-Soft. Todos los derechos reservados.
          </p>
          <p className="font-mono-tech text-xs">
            Next.js · TypeScript · Ingeniería Web
          </p>
        </div>
      </div>
    </footer>
  );
}
